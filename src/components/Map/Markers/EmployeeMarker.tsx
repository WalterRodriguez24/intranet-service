"use client";
import Avatar from "@/components/Avatar";
import { Employee } from "@/domain/employee/client";
import classNames from "classnames";
import { useState } from "react";
import { Marker, MarkerProps, Popup } from "react-map-gl";

type Props = MarkerProps & {
  employee: Employee;
};

export default function EmployeeMarker(props: Props) {
  const { employee, ...markerProps } = props;

  const [showPopup, setShowPopup] = useState(false);

  const markerClasses = classNames("p-1 bg-white rounded-full shadow-pale", {
    "cursor-pointer": !showPopup,
  });

  return (
    <>
      <Marker {...markerProps}>
        <div className={markerClasses} onMouseEnter={() => setShowPopup(true)}>
          <Avatar name={employee.name} size={32} />
        </div>
      </Marker>
      {showPopup && (
        <Popup
          longitude={markerProps.longitude}
          latitude={markerProps.latitude}
          onClose={() => setShowPopup(false)}
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold">- {employee.name}</span>
            <span className="text-xs font-bold">- {employee.direction}</span>
            <span className="text-xs font-bold">- {employee.position}</span>
          </div>
        </Popup>
      )}
    </>
  );
}
