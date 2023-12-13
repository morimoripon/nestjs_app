"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUtils = void 0;
const storage_1 = require("@google-cloud/storage");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ImageUtils = class ImageUtils {
    constructor(configService) {
        this.configService = configService;
        this.createStorage = () => {
            return new storage_1.Storage({
                projectId: process.env.NODE_ENV === 'production' ? 'morimoripon-production' : 'morimoripon-staging',
                credentials: {
                    client_email: this.configService.get('GOOGLE_CLIENT_EMAIL'),
                    private_key: this.configService.get('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n'),
                },
            });
        };
        this.signedUrlConfig = (fileType) => {
            return {
                version: 'v4',
                action: 'write',
                expires: Date.now() + 15 * 60 * 1000,
                contentType: fileType,
            };
        };
    }
    async generateImageUrl(filename, fileType, path) {
        const urls = await this.generateImageUrls([{ filename, fileType, path }]);
        return urls[0];
    }
    async generateImageUrls(images) {
        const storage = this.createStorage();
        const bucketName = `morimoripon-images-${process.env.NODE_ENV}`;
        const signedUrls = await Promise.all(images.map(async (image) => {
            return this.generateSignedUrl(image, storage, bucketName);
        }));
        return signedUrls;
    }
    async generateSignedUrl(image, storage, bucketName) {
        const file = storage.bucket(bucketName).file(`${process.env.NODE_ENV}/${image.path}/images/${image.filename}`);
        const signedUrlConfig = this.signedUrlConfig(image.fileType);
        const [signedUrl] = await file.getSignedUrl(signedUrlConfig);
        return signedUrl;
    }
};
ImageUtils = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ImageUtils);
exports.ImageUtils = ImageUtils;
//# sourceMappingURL=image.utils.js.map