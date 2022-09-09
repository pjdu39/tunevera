<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#">Populares</b-nav-item>
                <b-nav-item href="#">Mediterránea</b-nav-item>
                <b-nav-item href="#">Oriental</b-nav-item>
                <b-nav-item href="#">Italiana</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>
                <b-dropdown-item href="#">
                    <span class="fa fa-user" aria-hidden="true"></span>
                </b-dropdown-item>
            </b-navbar-nav>
        </b-collapse>

    </b-navbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>