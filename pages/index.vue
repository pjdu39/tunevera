<template>
  <div>
    <!-- <main></main> -->
    <b-row>
      <b-col md="4"></b-col>
      <b-col md="4">
        <b-list-group-item
            class="elemento"
            v-for="(elemento, index) in elementos"
            :key="index"
          >
          <div class="linea-superior">
            <h4>{{ elemento.titulo }}</h4>
            <div class="autor">por <b>{{ elemento.autor }}</b></div>
          </div>
          <div>{{ elemento.descripcion }}</div>
          <div class="interacciones">
            <div class="likes">
              <span class="fa fa-heart" aria-hidden="true"></span>
            </div>
            <div class="num">{{ elemento.likes }}</div>
            <div class="comentarios">
              <span class="fa fa-comment" aria-hidden="true"></span>
            </div>
            <div class="num">{{ elemento.comentarios.length }}</div>
          </div>
        </b-list-group-item>
      </b-col>
      <b-col md="4"></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      elementos: [
        { 
          titulo: 'Cocido',
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
          autor: 'Carlos',
          likes: 67,
          comentarios: [
            { usuario: 'Pepe Hamond', texto: 'Lorem ipsum dolor sit amet' },
            { usuario: 'Carlos', texto: 'Consectetur adipisicing elit. Dolor sit amet consectetur adipisicing' }
          ]
        },
        { 
          titulo: 'Galletas',
          descripcion: 'Lorem ipsum dolor sit amet adipisicing elit',
          autor: 'Andrea',
          likes: 216,
          comentarios: [
            { usuario: 'Pepe Hamond', texto: 'Consectetur adipisicing elit. Dolor sit amet ipsum dolor sit consectetur adipisicing hahah' },
            { usuario: 'Carlos', texto: 'Lorem ipsum dolor sit amet.' },
            { usuario: 'Andrea', texto: 'Consectetur elit adipisicing. Dolor sit amet consectetur adipisicing' }
          ]
        }
      ]
    }
  }
}
</script>
<style scoped>

.mainBox { /* TODO: Borrar si continúa sin usarse */
  background-color: #eaedee;
  border-radius: 1rem;
  box-shadow: 1.5px 1.5px 30px -10px #252b31;
}

.elemento {
  margin-bottom: 2rem;
  background-color: #eaedee;
  border-radius: 1rem;
  box-shadow: 1.5px 1.5px 30px -10px #252b31;
}

.linea-superior {
  display: inline-flex;
  width: 100%;
}

.autor {
  text-align: end;
  margin-left: auto;
  font-style: italic;
}

.interacciones {
  margin-top: 1rem;
  display: inline-flex;
}

.likes {
  text-align: center;
  height: 1.9rem;
  width: 1.9rem;
  padding: .25rem;
  color: #d49c6b;
}

.comentarios {
  text-align: center;
  height: 1.9rem;
  width: 1.9rem;
  padding: .25rem;
  color: #d49c6b;
}

.num {
  font-size: 90%;
  padding-top: .4rem;
  margin-left: .2rem;
  margin-right: 1rem;
}

</style>