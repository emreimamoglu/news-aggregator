<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait HttpResponses
{
    /**
     * @param $data
     * @param int $status
     * @return JsonResponse
     */
    protected function success($data, $message = null, $status = 200): JsonResponse
    {
        return response()->json([
            'data' => $data,
            'message' => $message,
        ], $status);
    }

   /**
     * @param $data
     * @param int $status
     * @return JsonResponse
     */
    protected function error($data, $message = null, $status = 500): JsonResponse
    {
        return response()->json([
            'data' => $data,
            'message' => $message,
        ], $status);
    }
}