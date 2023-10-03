import axios from '../../config/axios';

const endpoints = {
    UPLOAD: '/upload',
};

class FileService {
    public static getInstance() {
        if (!this.instance) {
            this.instance = new FileService();
        }

        return this.instance;
    }

    private static instance: FileService;

    public upload(data: FormData) {
        return axios
            .post<any>(endpoints.UPLOAD, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            )
            .then((res) => res.data)
    }
}

export default FileService;
