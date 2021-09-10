export default (original) => ({
    ...original,

    data: () => ({
        ...original.data(),
        hasPerformedPrepopulation: false,
    }),

    methods: {
        ...original.methods,

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

        /**
         * Get the many-to-many relationship field.
         */
        getField() {
            this.field = null

            Nova.request()
                .get(
                    '/nova-api/' + this.resourceName + '/field/' + this.viaRelationship,
                    {
                        params: {
                            relatable: true,
                        },
                    }
                )
                .then(({ data }) => {
                    this.field = data

                    if (this.field.searchable) {
                        if (!this.shouldPrepopulate) {
                            this.determineIfSoftDeletes()
                        } else {
                            this.prepopulate();
                        }
                    } else {
                        this.getAvailableResources()
                    }

                    this.loading = false
                })
        },

        toggleWithTrashed() {
            original.methods.toggleWithTrashed.call(this);

            this.prepopulate()
        }
    },

    computed: {
        ...original.computed,

        shouldPrepopulate() {
            return (
                this.field.prepopulate &&
                this.isSearchable &&
                !this.initializingWithExistingResource
            )
        },
    },
})
