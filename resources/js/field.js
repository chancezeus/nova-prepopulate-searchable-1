Nova.booting((Vue, router) => {
    const belongsTo = require('./components/BelongsToField')

    Vue.component('form-belongs-to-field', Vue.component('form-belongs-to-field').extend(belongsTo))
    Vue.component('form-morph-to-field', Vue.component('form-morph-to-field').extend(belongsTo).extend(require('./components/MorphToField')))

    const attachRoute = router.options.routes.find(route => route.name === 'attach')
    if (attachRoute) {
        attachRoute.component = require('./views/Attach').default(attachRoute.component);

        const newRouter = new router.constructor(router.options);

        router.matcher = newRouter.matcher;
    }
})
