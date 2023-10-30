import * as React from "react";
import PhotoGallery from "./PhotoGallery";
import { type ReactNode } from "react";

export default function Corvette(): ReactNode {
  return (
    <div>
      <h2 className="text-primary">2001 Chevrolet Corvette Coupe</h2>
      <p>
        New to me in 2019. Purchased with 59,000 miles on the clock, Corsa Sport
        axle back exhaust, BBK cold air intake, short throw shifter and black
        logoed interior mats.
      </p>
      <PhotoGallery
        perPage={9}
        totalPhotos={9}
        filePrefix="images/corvettePhotos/photo"
        fileSuffix=".jpg"
      />
    </div>
  );
}
