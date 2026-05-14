//! Flight event queue.
//!
//! Port of `info.openrocket.core.simulation.FlightEvent` + `EventQueue`.

use std::cmp::Ordering;
use std::collections::BinaryHeap;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum EventKind {
    Launch,
    Ignition,
    Liftoff,
    LaunchRod,
    Burnout,
    EjectionCharge,
    Apogee,
    RecoveryDeviceDeployment,
    GroundHit,
    SimulationEnd,
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Event {
    pub time: f64,
    pub kind: EventKind,
}

impl Eq for Event {}

impl Ord for Event {
    fn cmp(&self, other: &Self) -> Ordering {
        // BinaryHeap is max-heap, so invert to get earliest-time-first.
        other
            .time
            .partial_cmp(&self.time)
            .unwrap_or(Ordering::Equal)
    }
}

impl PartialOrd for Event {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

#[derive(Default)]
pub struct EventQueue(BinaryHeap<Event>);

impl EventQueue {
    pub fn push(&mut self, ev: Event) {
        self.0.push(ev);
    }

    pub fn pop_due(&mut self, now: f64) -> Option<Event> {
        if let Some(top) = self.0.peek() {
            if top.time <= now {
                return self.0.pop();
            }
        }
        None
    }

    pub fn peek(&self) -> Option<&Event> {
        self.0.peek()
    }

    pub fn len(&self) -> usize {
        self.0.len()
    }

    pub fn is_empty(&self) -> bool {
        self.0.is_empty()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn earliest_event_pops_first() {
        let mut q = EventQueue::default();
        q.push(Event { time: 5.0, kind: EventKind::Apogee });
        q.push(Event { time: 1.0, kind: EventKind::Ignition });
        q.push(Event { time: 3.0, kind: EventKind::Burnout });
        assert_eq!(q.pop_due(10.0).unwrap().kind, EventKind::Ignition);
        assert_eq!(q.pop_due(10.0).unwrap().kind, EventKind::Burnout);
        assert_eq!(q.pop_due(10.0).unwrap().kind, EventKind::Apogee);
        assert!(q.is_empty());
    }

    #[test]
    fn pop_due_respects_clock() {
        let mut q = EventQueue::default();
        q.push(Event { time: 2.0, kind: EventKind::Burnout });
        assert!(q.pop_due(1.0).is_none());
        assert_eq!(q.pop_due(2.0).unwrap().kind, EventKind::Burnout);
    }
}
