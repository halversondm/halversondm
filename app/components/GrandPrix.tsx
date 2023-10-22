/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from 'react'
import { PhotoGallery } from './PhotoGallery'
import { type ReactNode } from 'react'

export class GrandPrix extends React.Component<unknown, unknown> {
  render (): ReactNode {
    return (
            <div>
                <h2 className="text-primary">2001 Pontiac Grand Prix GTP Coupe</h2>
                <h3>Galaxy Silver Metallic / Granite Leather</h3>
                <ul>
                    <li>3.8L V6 Supercharged</li>
                    <li>66,500 miles</li>
                    <li>Purchased 9/29/2000 from Randy Reed Buick Pontiac GMC in Kansas
                        City, Missouri
                    </li>
                    <li>Power Windows</li>
                    <li>Power Door Locks</li>
                    <li>Power Steering</li>
                    <li>Power Side Mirrors</li>
                    <li>Power Drivers Seat with Lumbar Support</li>
                    <li>Power Sunroof</li>
                    <li>Heated Drivers Seat</li>
                    <li>Compass and Thermometer in Auto Dimming Rear View Mirror</li>
                    <li>Heads-Up Display</li>
                    <li>5 Windows Tinted to 35%</li>
                    <li>OnStar</li>
                    <li>16&quot; High Polished Torque-Star Wheels</li>
                    <li>Dunlop Sport A2 tires (about 20,000 miles on them)</li>
                    <li>KYB Struts with higher rate GM springs, Rear springs are from an
                        Oldsmobile Intrigue. No rear end sag!
                    </li>
                    <li>Motorsports Performance Cold Air Intake</li>
                    <li>PRJ spark plug wires</li>
                    <li>NGK TR55 plugs (replaced at 64,000 miles)</li>
                    <li>3.4” Supercharger Pulley</li>
                    <li>Intense Performance-coded PCM</li>
                    <li>180-degree thermostat</li>
                    <li>Custom cat-back exhaust with Flowmaster 40 series mufflers and
                        chrome round tips
                    </li>
                    <li>Polyurethane front motor mounts</li>
                    <li>Polyurethane front sway bar links</li>
                    <li>Buick Front Strut tower brace</li>
                    <li>Buick Rear Strut tower brace</li>
                    <li>Avital Remote Start</li>
                    <li>Factory Bose sound</li>
                    <li>Matching front, rear and side red badges by Reflective Concepts
                    </li>
                    <li>Disabled Daytime Running Lights</li>
                    <li>Optima Yellow Top Battery</li>
                    <li>Mobil 1 oil and transmission fluid</li>
                    <li>Non-Smoker car.&nbsp; Driven but not abused. NEVER been to the
                        track.
                    </li>
                </ul>
                <PhotoGallery perPage={9} totalPhotos={38} filePrefix="images/grandPrixPhotos/photo" fileSuffix=".jpg"/>
            </div>
    )
  }
}
