<template>
	<div class="recommendTitle">
		<h3><slot></slot></h3>
	</div>
</template>

<script>
export default {
	name:'RecommendTitle'
}
</script>

<style lang="scss">
h3{
	border-left: 2px solid red;
		padding-left: 10px;
		margin: 15px 0 10px 0;
		line-height: 1em;
}

</style>