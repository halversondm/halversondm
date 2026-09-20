/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from "react";
import PhotoGallery from "./PhotoGallery";
import { type ReactNode } from "react";

export default function Honda(): ReactNode {
  return (
    <div>
      <h2 className="text-primary">1997 Honda Shadow 750 ACE</h2>
      <p>
        In August 2007, I bought this Honda Shadow. The bike came with the
        saddle bags, custom forward controls, and windshield. It was a pretty
        good find for the price. I didn&apos;t love the single-front disc and
        rear drum brake, but otherwise it was a solid bike. Unfortunately, I
        lost the bike to an accident on I294 on the way to Harley&apos;s 105th
        Anniversary Celebration in 2008.
      </p>
      <PhotoGallery
        perPage={6}
        totalPhotos={6}
        filePrefix="images/hondaPhotos/photo"
        fileSuffix=".jpg"
      />
    </div>
  );
}
