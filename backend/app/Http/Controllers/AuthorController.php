<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Models\Author;
use App\Traits\HttpResponses;

class AuthorController extends Controller
{
    use HttpResponses;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->success(Author::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAuthorRequest $request)
    {
        $request->validated($request->all());
        $author = Author::create($request->all());
        return $this->success($author, 'Author created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Author $author)
    {
        return $this->success($author);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAuthorRequest $request, Author $author)
    {
        $request->validated($request->all());
        $author->update($request->all());
        return $this->success($author, 'Author updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Author $author)
    {
        $author->delete();
        return $this->success(null, 'Author deleted successfully');
    }
}
