<?php

namespace App\Http\Controllers;

use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\File;

class FileController extends Controller
{
    use HttpResponses;

    public function upload(Request $request)
    {
        try {
            \Log::info('Uploading file');
            $file = $request->file('file');
            $fileName = time() . '.' . $request->file->extension();
            Storage::disk('gcs')->put($fileName, file_get_contents($file));
            $publicUrl = Storage::disk('gcs')->url($fileName);

            $item = File::create([
                'url' => $publicUrl
            ]);

            return $this->success([
                'file' => $item
            ], 'File uploaded successfully', 201);
        } catch (\Exception $e) {
            \Log::error('File upload failed: ' . $e->getMessage());
            return $this->error($e->getMessage(), 'File upload failed', 500);
        }
    }
}