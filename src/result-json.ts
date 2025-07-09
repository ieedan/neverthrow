export namespace ResultJson {
	/**
	 * Returns true if the provided value is a Result
	 *
	 * @param value
	 * @returns
	 */
	export function is(value: unknown): value is ResultJson<unknown, unknown> {
		if (typeof value === "object" && value !== null) {
			if ("__tag" in value && ("error" in value || "value" in value)) {
				return true;
			}
		}

		return false;
	}

	export function isErr<T, E>(result: ResultJson<T, E>): result is ErrJson<E> {
		return result.__tag === "err";
	}

	export function isOk<T, E>(result: ResultJson<T, E>): result is OkJson<T> {
		return result.__tag === "ok";
	}

	/**
	 * Returns a transportable `Ok` result.
	 *
	 * @param value
	 * @returns
	 */
	export function ok<T>(value: T): OkJson<T> {
		return { __tag: "ok", value };
	}

	/**
	 * Returns a transportable `Err` result.
	 *
	 * @param error
	 * @returns
	 */
	export function err<E>(error: E): ErrJson<E> {
		return { __tag: "err", error };
	}
}

export type OkJson<T> = { __tag: "ok"; value: T };
export type ErrJson<E> = { __tag: "err"; error: E };

export type ResultJson<T, E> = OkJson<T> | ErrJson<E>;
