<script>
export default {
  data: () => ({
    hasPerformedPrepopulation: false,
  }),

  mounted() {
    this.prepopulate();
  },

  methods: {
    prepopulate() {
      if (!this.isReadonly && this.isSearchable && (this.field.prepopulate || false)) {
        if (this.field.prepopulate_query) {
          this.search = this.field.prepopulate_query
        }

        this.hasPerformedPrepopulation = true
        this.getAvailableResources()
        this.search = ''
      }
    },
  },
}
</script>
