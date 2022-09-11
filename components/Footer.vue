<template>
  <div class="navbar-container">
    <b-navbar toggleable="lg" type="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">
                <span class="fa fa-user" aria-hidden="true"></span>
            </b-nav-item>
            <b-nav-item href="#">
                <span class="fa fa-user" aria-hidden="true"></span>
            </b-nav-item>
            <b-nav-item href="#">
                <span class="fa fa-user" aria-hidden="true"></span>
            </b-nav-item>
            <b-nav-item href="#">
                <span class="fa fa-user" aria-hidden="true"></span>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar-container{
    height: 2.5rem;
    background-color: rgb(29, 20, 15);
    display: block;
}

.navbar-dark .navbar-nav .nav-link {
    margin-left: 1rem;
    margin-right: 1rem;
    color: rgb(243, 243, 243);
    background-color: rgb(29, 20, 15);
    border-radius: 2rem;
}

</style>