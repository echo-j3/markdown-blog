<script>
	import * as config from '$lib/config'
	import { formatDate } from '$lib/utils'
	export let data
	let qualifies = []

	function postFilter() {
		data.posts.forEach((post) => {
			if (post.categories.includes(data.category) && post.published === true) {
				post.slug = '/' + post.slug
				qualifies = [...qualifies, post]
			}
		})
	}

	postFilter()
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section>
	<h1>&num; {data.category}</h1>
	<ul class="posts">
		{#each qualifies as post}
			<li class="post">
				<a href={post.slug} class="title">{post.title}</a>
				<p class="date">{formatDate(post.date)}</p>
				<p class="description">{post.description}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	h1 {
		font-size: var(--font-size-fluid-3);
		text-transform: capitalize;
		display: flex;
		margin-bottom: var(--size-7);
	}

	ul {
		padding-left: var(--size-3);
	}

	.posts {
		display: grid;
		gap: var(--size-7);
	}

	.post {
		max-inline-size: var(--size-content-3);
	}

	.post:not(:last-child) {
		border-bottom: 1px solid var(--border);
		padding-bottom: var(--size-7);
	}

	.title {
		font-size: var(--font-size-fluid-3);
		text-transform: capitalize;
	}

	.date {
		color: var(--text-2);
	}

	.description {
		margin-top: var(--size-3);
	}
</style>
