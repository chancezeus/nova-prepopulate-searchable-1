<script>
export default {
    methods: {
        /**
         * Handle the changing of the resource type.
         */
        async refreshResourcesForTypeChange(event) {
            await this.constructor.super.options.methods.refreshResourcesForTypeChange.call(this, event)

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
                !this.initializingWithExistingResource &&
                this.resourceType
            )
        }
    },
}
</script>
