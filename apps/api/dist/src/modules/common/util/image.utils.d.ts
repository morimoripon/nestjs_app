import { ConfigService } from '@nestjs/config';
export declare class ImageUtils {
    private readonly configService;
    constructor(configService: ConfigService);
    generateImageUrl(filename: string, fileType: string, path: 'users' | 'items' | 'documents' | 'genres' | 'messages' | 'genreIcons' | 'tagIcons' | 'titles'): Promise<string>;
    generateImageUrls(images: {
        filename: string;
        fileType: string;
        path: 'users' | 'items' | 'documents' | 'genres' | 'messages' | 'genreIcons' | 'tagIcons' | 'titles';
    }[]): Promise<string[]>;
    private generateSignedUrl;
    private createStorage;
    private signedUrlConfig;
}
