/**
 * Created by Daniel on 6/26/2016.
 */
"use strict";

import React from "react";
import PhotoGallery from "./PhotoGallery";

const Yamaha = React.createClass({

  render() {
    return <div>
      <h2 className="text-primary">2004 Yamaha VStar 1100 Classic</h2>
      <p>In July 2004, I bought this Yamaha from Reno's Yamaha in Kansas City,
        Missouri. I upgraded the exhaust to Hard Krome, added a Corbin based
        Yamaha option seat, and added some chrome goodies from Yamaha.</p>
      <PhotoGallery perPage={4} totalPhotos={4} filePrefix="images/yamahaPhotos/photo" fileSuffix=".jpg" />
    </div>;
  }
});

export default Yamaha;
