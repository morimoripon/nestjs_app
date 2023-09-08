import { GetSignedUrlConfig, Storage } from '@google-cloud/storage'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ImageUtils {
  constructor(private readonly configService: ConfigService) {}

  async generateImageUrl(
    filename: string,
    fileType: string,
    path: 'users' | 'items' | 'documents' | 'genres' | 'messages' | 'genreIcons' | 'tagIcons' | 'titles',
  ): Promise<string> {
    const urls = await this.generateImageUrls([{ filename, fileType, path }])
    return urls[0]
  }

  async generateImageUrls(
    images: {
      filename: string
      fileType: string
      path: 'users' | 'items' | 'documents' | 'genres' | 'messages' | 'genreIcons' | 'tagIcons' | 'titles'
    }[],
  ): Promise<string[]> {
    const storage = this.createStorage()
    const bucketName = `morimoripon-images-${process.env.NODE_ENV}`

    const signedUrls = await Promise.all(
      images.map(async image => {
        return this.generateSignedUrl(image, storage, bucketName)
      }),
    )

    return signedUrls
  }

  private async generateSignedUrl(
    image: { filename: string; fileType: string; path: string },
    storage: Storage,
    bucketName: string,
  ): Promise<string> {
    const file = storage.bucket(bucketName).file(`${process.env.NODE_ENV}/${image.path}/images/${image.filename}`)
    const signedUrlConfig = this.signedUrlConfig(image.fileType)
    const [signedUrl] = await file.getSignedUrl(signedUrlConfig)
    return signedUrl
  }

  private createStorage = () => {
    return new Storage({
      projectId: process.env.NODE_ENV === 'production' ? 'morimoripon-production' : 'morimoripon-staging',
      credentials: {
        client_email: this.configService.get<string>('GOOGLE_CLIENT_EMAIL'),
        private_key: this.configService.get<string>('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n'),
      },
    })
  }

  private signedUrlConfig = (fileType: string): GetSignedUrlConfig => {
    return {
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15分で有効期限切れ
      contentType: fileType,
    }
  }
}
