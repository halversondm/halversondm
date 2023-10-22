/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from 'react'
import { PhotoGallery } from './PhotoGallery'
import { type ReactNode } from 'react'

export class Yamaha extends React.Component<unknown, unknown> {
  render (): ReactNode {
    return (
            <div>
                <h2 className="text-primary">2004 Yamaha VStar 1100 Classic</h2>
                <p>In July 2004, I bought this Yamaha from Reno&quot;s Yamaha in Kansas City,
                    Missouri. I upgraded the exhaust to Hard Krome, added a Corbin based
                    Yamaha option seat, and added some chrome goodies from Yamaha.</p>
                <PhotoGallery perPage={4} totalPhotos={4} filePrefix="images/yamahaPhotos/photo" fileSuffix=".jpg"/>
            </div>
    )
  }
}
