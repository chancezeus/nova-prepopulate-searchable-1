<?php

namespace GeneaLabs\NovaPrepopulateSearchable;

use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Fields\Field;
use Laravel\Nova\Nova;

class FieldServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Nova::serving(function (ServingNova $event) {
            Field::macro('prepopulate', function ($query = null) {
                $this->meta['prepopulate'] = true;
                $this->meta['prepopulate_query'] = $query;

                return $this;
            });

            Nova::script(
                'nova-prepopulate-searchable',
                __DIR__ . '/../dist/js/field.js'
            );
        });
    }
}
