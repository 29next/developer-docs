/**
 * Re-export APIPage from the openapi server instance so it can be
 * registered as an MDX component in the docs page renderer.
 * The generated MDX files call: <APIPage document="..." operations={[...]} />
 */
import { openapi } from '@/lib/openapi';

export const { APIPage } = openapi;
