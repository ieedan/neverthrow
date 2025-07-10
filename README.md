# nevereverthrow 🔥

![NPM Downloads](https://img.shields.io/npm/dm/nevereverthrow)

> `nevereverthrow` is a fork of [neverthrow](https://github.com/supermacro/neverthrow) that extends it's behavior with some additional useful utilities. It remains fully backward compatible to make switching as simple as changing an import.

<div id="toc"></div>

## Table Of Contents

This fork extends the behavior of [neverthrow](https://github.com/supermacro/neverthrow) so instead of making you play spot the difference we will just detail the things that have been added. For documentation of the entire API please refer back to the [original project](https://github.com/supermacro/neverthrow#toc).

-   [Installation](#installation)
-   [API Documentation](#api-documentation)

## Installation

Because `nevereverthrow` is fully compatible with [neverthrow](https://github.com/supermacro/neverthrow) all you need to do is change the import and then find and replace `neverthrow` with `nevereverthrow`.

```sh
npm un neverthrow
npm i nevereverthrow
```

```diff
-import { Result, ResultAsync } from "neverthrow";
+import { Result, ResultAsync } from "nevereverthrow";
```

[⬆️ Back to top](#toc)

## API Documentation

### `ResultJson`

`ResultJson` solves the problem of transporting results between the client and server.

In `nevereverthrow` you can serialize the `Result` type and then attach the helper methods to it again on the client/server.

Example:

```ts
// === server ===

import { ResultJson } from "nevereverthrow";

export async function mutation(): Promise<Result<number, string>> {
	if (1 > 0) return ResultJson.err("oops!");

	return ResultJson.ok(12);
}

// === client ===

import { Result, ResultAsync, ResultJson } from "nevereverthrow";

async function callClient<T>(fn: () => Promise<T>): Promise<Result<T, string>> {
	return ResultAsync.fromPromise(
		(async () => {
			const res = await fn();

			if (ResultJson.is(res)) {
				// cast here cause we are just turning it into the right type
				return Result.fromJson(res) as T;
			} else {
				return res;
			}
		})(),
		(e) => `${e}`
	);
}

export async function callMutation() {
	const result = await callClient(mutation);

	if (result.isErr()) {
		// internal server error
		return;
	}

	if (result.value.isErr()) {
		// show this error to the user
		return;
	}
}
```

[⬆️ Back to top](#toc)

If you find this package useful, please consider sponsoring [supermacro](https://github.com/sponsors/supermacro/) or simply [buying him a coffee](https://ko-fi.com/gdelgado)!
