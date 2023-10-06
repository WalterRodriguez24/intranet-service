"use client";
import BuildingIcon from "@/icons/BuildingIcon";
import { BranchOffice } from "@/types/BranchOffice";
import { useState } from "react";
import { Marker, MarkerProps, Popup } from "react-map-gl";

type Props = MarkerProps & {
  branchOffice: BranchOffice;
};

export default function BranchOfficeMarker(props: Props) {
  const { branchOffice, ...markerProps } = props;

  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Marker {...markerProps}>
        <div
          className="p-2 bg-white rounded-full shadow-pale text-xl text-orange-500"
          onMouseEnter={() => setShowPopup(true)}
        >
          <BuildingIcon />
        </div>
      </Marker>
      {showPopup && (
        <Popup
          longitude={markerProps.longitude}
          latitude={markerProps.latitude}
          className="p-0 max-w-[130px]"
          onClose={() => setShowPopup(false)}
        >
          <div className="flex flex-col">
            <img
              src="/images/branch-office.webp"
              alt=""
              className="w-full max-w-[130px] aspect-video rounded-md object-cover"
            />

            <div className="flex flex-col gap-1 p-2">
              <span className="text-xs font-bold">- {branchOffice.name}</span>
              <span className="text-xs font-bold">
                - {branchOffice.direction}
              </span>
              <span className="text-xs font-bold">
                - {`capacidad: ${branchOffice.capacity} toneladas`}
              </span>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
}
