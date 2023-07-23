<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSourceRequest;
use App\Http\Requests\UpdateSourceRequest;
use App\Models\Source;
use App\Traits\HttpResponses;

class SourceController extends Controller
{
    use HttpResponses;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->success(Source::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSourceRequest $request)
    {
        $request->validated($request->all());
        $source = Source::create($request->all());
        return $this->success($source, 'Source created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Source $source)
    {
        return $this->success($source);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSourceRequest $request, Source $source)
    {
        $request->validated($request->all());
        $source->update($request->all());
        return $this->success($source, 'Source updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Source $source)
    {
        $source->delete();
        return $this->success(null, 'Source deleted successfully');
    }
}
