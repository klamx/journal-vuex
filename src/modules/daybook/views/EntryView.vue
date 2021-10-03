<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>

      <div>
        <input
          type="file"
          v-show="false"
          @change="onSelectedImage"
          ref="imageSelector"
          accept="image/png, image/jpeg, image/jpg"
        />
        <button
          @click="onDeleteEntry"
          v-if="entry.id"
          class="btn btn-danger mx-2"
        >
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
        <button @click="onSelectImage" class="btn btn-primary">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>

    <hr />

    <div class="d-flex flex-column px-3 h-75">
      <textarea v-model="entry.text" placeholder="¿Qué sucedió hoy?"></textarea>
    </div>
  </template>

  <Fab icon="fa-save" @on:click="saveEntry" />

  <!-- <img
    src="https://upload.wikimedia.org/wikipedia/commons/3/35/Neckertal_20150527-6384.jpg"
    alt="entry-picture"
    class="img-thumbnail"
  /> -->

  <img
    v-if="localImage"
    :src="localImage"
    alt="entry-picture"
    class="img-thumbnail"
  />
</template>

<script>
import { defineAsyncComponent } from "vue";
import getDayMonthYear from "../helpers/getDayMonthYear";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },

  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },

  data() {
    return {
      entry: null,
      localImage: null,
      file: null,
    };
  },

  methods: {
    loadEntry() {
      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }

      this.entry = entry;
    },

    async saveEntry() {
      if (this.entry.id) {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        // actualizar
        await this.updateEntry(this.entry);
      } else {
        // crear nueva entrada
        const id = await this.createEntry(this.entry);
        this.$router.push({ name: "entry", params: { id } });
      }
      Swal.fire("Guardado", "Entrada registrada con exito", "success");
    },

    async onDeleteEntry() {
      const result = await Swal.fire({
        title: "¿Esta seguro?",
        text: "Una vez borrado no se puede recuperar",
        showDenyButton: true,
        confirmButtonText: "Si, estoy seguro",
      });
      if (result.isConfirmed) {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        await this.deleteEntry(this.entry.id);
        this.$router.push({ name: "no-entry" });
        Swal.fire("Eliminado", "", "success");
      }
    },

    onSelectedImage(event) {
      const file = event.target.files[0];
      if (!file) {
        this.localImage = null;
        this.file = null;
        return;
      }

      this.file = file;
      const fr = new FileReader();
      fr.onload = () => (this.localImage = fr.result);
      fr.readAsDataURL(file);
    },

    onSelectImage() {
      this.$refs.imageSelector.click();
    },

    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),
  },

  created() {
    // console.log(this.id, this.getEntryById);
    this.loadEntry();
  },

  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;
  resize: none;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>