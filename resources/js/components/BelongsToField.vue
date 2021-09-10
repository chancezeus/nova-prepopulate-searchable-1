<script>
export default {
    data: () => ({
        hasPerformedPrepopulation: false,
    }),

    mounted() {
        this.prepopulate()
    },

    methods: {
        prepopulate() {
            if (this.shouldPrepopulate) {
                if (this.field.prepopulate_query) {
                    this.search = this.field.prepopulate_query
                }

                this.hasPerformedPrepopulation = true
                this.getAvailableResources()
                this.search = ''
            }
        },

        toggleWithTrashed() {
            if (this.constructor.super.super.options.methods.toggleWithTrashed) {
                this.constructor.super.super.options.methods.toggleWithTrashed.call(this)
            } else {
                this.constructor.super.options.methods.toggleWithTrashed.call(this)
            }

            this.prepopulate()
        }
    },

    computed: {
        shouldPrepopulate() {
            return (
                this.field.prepopulate &&
                this.isSearchable &&
                !this.isLocked &&
                !this.isReadonly &&
                !this.initializingWithExistingResource
            )
        },
    },
}
</script>
