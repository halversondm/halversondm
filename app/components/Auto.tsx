/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from "react";
import { Link } from "react-router-dom";
import { type ReactNode } from "react";

export default function Auto(): ReactNode {
  return (
    <div>
      <h2 className="text-primary">Autos</h2>
      <p>
        I&apos;ve had three cars and two motorcycles that I&apos;ve really
        enjoyed since I have been able to buy.
      </p>
      <ul>
        <li>
          <Link to="/grandPrix">2001 Grand Prix GTP</Link>
        </li>
        <li>
          <Link to="/charger">2012 Dodge Charger R/T</Link>
        </li>
        <li>
          <Link to="/honda">1997 Honda Shadow 750 ACE</Link>
        </li>
        <li>
          <Link to="/yamaha">2004 Yamaha VStar 1100 Classic</Link>
        </li>
        <li>
          <Link to="/corvette">2001 Chevrolet Corvette</Link>
        </li>
        <li>
          <Link to="/C5Secrets">C5 Corvette Tips and Secrets</Link>
        </li>
      </ul>
    </div>
  );
}
