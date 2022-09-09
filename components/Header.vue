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
                <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Buscar</b-button>
                </b-nav-form>
                <b-nav-item href="#">
                    <span class="fa fa-user fa-2x" aria-hidden="true"></span>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>

    </b-navbar>

    <div class="banner-image-container">
        <div class="banner-image"></div>
    </div>
    

    <b-img class="" src="~/assets/img/banner.jpg"></b-img>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.banner-image-container{
    background-color: rgba(87, 52, 27, 0.815);
}
.banner-image {
    background-position-x: center !important;
    background-repeat: no-repeat !important;
    height: 7rem;
    background: url("~/assets/img/banner.jpg");
}
.test{
    background-image: linear-gradient(rgba(87, 52, 27, 0.815), rgba(87, 52, 27, 0.815));
}
</style>