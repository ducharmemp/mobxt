/**
 * @module types
 */
import {
  IObservableArray,
  IObservableObject,
  Lambda,
  ObservableSet
} from "mobx";

/**
 * @private
 */
export type Constructor<T> = new (...args: any[]) => T;
export type CollectionName = PropertyKey;
export type PrimaryKey = Set<PropertyKey>;
export type IndexValue = PropertyKey; // TODO: Should this support more complex types?
export type IndexKey = PropertyKey;
export type TriggerId = number;

/**
 *
 */
export interface CascadeOptions {
  cascade?: boolean;
}

/**
 * Describes the order of execution for triggers.
 *
 * Equivalent to the following SQL:
 *   - Intercept `CREATE TRIGGER test BEFORE ...`, `CREATE TRIGGER test INSTEAD OF ...`
 *   - Observe `CREATE TRIGGER test AFTER ...`
 *
 * @export
 * @enum {number}
 */
export enum TriggerExecutionStrategy {
  Intercept, // Before event, allows rewrite
  Observe // After event, disallows rewrite
}

/**
 * Describes the event for the trigger to listen on. Corresponds to:
 * - Insert
 * - Delete
 * - Update
 *
 * And a wildcard `All`
 *
 * @export
 * @enum {string}
 */
export enum TriggerQueryEvent {
  Insert = "add",
  Delete = "delete",
  Update = "update",
  // Truncate = "truncate",
  All = "all"
}

/**
 * The trigger listener options. Controls the order of execution (before/after the event), as well
 * as the specific event type (add, delete)
 */
export interface TriggerOptions {
  eventTypes?: Set<TriggerQueryEvent>;
  triggerExecutionStrategy?: TriggerExecutionStrategy;
}

/**
 *
 */
export interface Meta {
  __meta__: {
    keys: ObservableSet<PrimaryKey>;

    collectionName: CollectionName;
    relationships: Record<
      PropertyKey,
      {
        type: Constructor<{}>;
        keys: IObservableArray<PrimaryKey>;
        options: CascadeOptions;
      }
    >;
    indicies: IObservableArray<PropertyKey>;
  };
}

/**
 *
 */
export interface Store extends IObservableObject {
  collections: Record<CollectionName, Map<PrimaryKey, any>>;
  indicies: Record<
    CollectionName,
    Record<
      IndexKey,
      Map<
        IndexValue,
        PrimaryKey
      >
    >
  >;
  triggers: Map<TriggerId, Lambda>;
  nextId: TriggerId;
}
