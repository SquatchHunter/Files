import { Entity, Vector3, World, world } from '@minecraft/server';
import { AntiGriefDynamicProperties, AntiGriefDefaults } from '../Models';

type PropertiesTypes = boolean | number | string | Vector3 | undefined;

export type AntiGriefPropertyKey = keyof typeof AntiGriefDefaults & keyof typeof AntiGriefDynamicProperties;

function isVector3(value: unknown): value is Vector3 {
	return (
		typeof value === 'object' &&
		value !== null &&
		'x' in value &&
		'y' in value &&
		'z' in value
	);
}

function isValidDynamicPropertyValue<T extends PropertiesTypes>(
	value: unknown,
	expected: T,
): value is T {
	if (typeof expected === 'boolean') {
		return typeof value === 'boolean';
	}

	if (typeof expected === 'number') {
		return typeof value === 'number' && Number.isFinite(value);
	}

	if (typeof expected === 'string') {
		return typeof value === 'string';
	}

	if (typeof expected === 'undefined') {
		return value === undefined;
	}

	if (isVector3(expected)) {
		return isVector3(value);
	}

	return false;
}

export function getDynProp<K extends AntiGriefPropertyKey>(
	property: K,
	from: World | Entity = world,
	fallback: (typeof AntiGriefDefaults)[K] = AntiGriefDefaults[property],
): (typeof AntiGriefDefaults)[K] {
	const propertyId = AntiGriefDynamicProperties[property];
	const value = from.getDynamicProperty(propertyId);

	if (isValidDynamicPropertyValue(value, fallback)) {
		return value;
	}

	return fallback;
}

export function getDynProps<T extends AntiGriefPropertyKey[]>(
	properties: T,
	from: World | Entity = world,
): { [K in T[number]]: (typeof AntiGriefDefaults)[K] } {
	return Object.fromEntries(
		properties.map(property => [property, getDynProp(property, from)]),
	) as { [K in T[number]]: (typeof AntiGriefDefaults)[K] };
}

/**
 * Converts the properties of the world or an entity from the enumType to a JS Object of type T
 * Enum keys and object properties should match for proper conversion.
 *
 * @template T - The type of the resulting object.
 * @param {World | Entity} from - The world or entity from which the properties are retrieved.
 * @param {{ [key: string]: string }} enumType - An object mapping property keys to dynamic property identifiers.
 *
 * @returns {T} - An object containing the properties extracted based on the enumType.
 */
export function getProperties<T>(from: World | Entity, enumType: { [key: string]: string }): T {
	const propertiesObject: Record<string, PropertiesTypes> = {};

	Object.entries(enumType).forEach(([key, value]: [string, string]): void => {
		propertiesObject[key] = from.getDynamicProperty(value);
	});

	return propertiesObject as T;
}

/**
 * Converts a JavaScript object into dynamic properties based on the `enumType`
 * and saves them in the provided world or entity.
 * Enum keys and object properties should match for proper conversion.
 *
 * @param {World | Entity} to - The world or entity where the properties will be set.
 * @param {{ [key: string]: string }} enumType - An object mapping property keys to dynamic property identifiers.
 * @param {object} propertyObject - A JavaScript object containing the properties to be set.
 */
export function setProperties<
	T extends Record<string, PropertiesTypes>,
	K extends Record<keyof T, string>
>(to: World | Entity, enumType: K, propertyObject: T): void {
	Object.entries(propertyObject).forEach(([key, value]: [string, PropertiesTypes]): void => {
		const identifier: string = enumType[key];

		if (identifier) {
			to.setDynamicProperty(identifier, value);
		}
	});
}
