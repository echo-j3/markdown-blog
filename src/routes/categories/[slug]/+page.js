import { error } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	try {
		const category = params.slug
		const response = await fetch('../api/posts')
		const posts = await response.json()

		return {
			posts: posts,
			category: category
		}
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`)
	}
}
