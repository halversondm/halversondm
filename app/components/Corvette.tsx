import * as React from "react";
import {PhotoGallery} from "./PhotoGallery";

export class Corvette extends React.Component<undefined, undefined> {

    render() {
        return (
            <div>
                <h2 className="text-primary">2001 Chevrolet Corvette Coupe</h2>
                <PhotoGallery perPage={9} totalPhotos={9} filePrefix="images/corvettePhotos/photo" fileSuffix=".jpg"/>
            </div>
        );
    }
}
