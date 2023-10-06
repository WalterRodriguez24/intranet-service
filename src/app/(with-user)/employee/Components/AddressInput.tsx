"use client";
import { PlaceSearchResponse, FeaturePlace } from "@/types/Place";
import { TextInput } from "flowbite-react";
import debounce from "just-debounce";
import { useState } from "react";

type Props = {
  direction?: string;
  onSelected: (place: FeaturePlace) => void;
};

export default function AddressInput(props: Props) {
  const { onSelected, direction } = props;

  const [inputValue, setInputValue] = useState(direction);

  const [result, setResult] = useState<PlaceSearchResponse | null>(null);

  const handleSearch = debounce(async (searchValue: string) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=pk.eyJ1IjoiaXRzbWVsZW9uYXJkbyIsImEiOiJja3ZzcmpoMTU0czBtMm9tbHZhbTMzYTFrIn0.fgwmkMuUlIaqcnXtQjbWfQ`
      );
      const data: PlaceSearchResponse = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);
    }
  }, 500);

  return (
    <div className="w-full relative">
      <TextInput
        type="text"
        value={inputValue}
        placeholder="Buscar dirección"
        onChange={(e) => {
          const value = e.target.value;
          handleSearch(value);
          setInputValue(value);
        }}
      />

      {result && (
        <div className="w-full flex flex-col gap-2 bg-white shadow-pale absolute bottom-[102%] max-h-32 overflow-y-auto rounded-lg">
          {result.features.map((feature) => {
            const [topName, ...rest] = feature.place_name.split(",");

            return (
              <button
                key={feature.id}
                type="button"
                className="py-1 px-2 cursor-pointer hover:bg-neutral-200 flex flex-col gap-1"
                onClick={() => {
                  onSelected(feature);
                  setResult(null);
                  setInputValue(feature.place_name);
                }}
              >
                <span className="text-xs font-bold">{topName}</span>
                <span className="text-xs">{rest.join(",")}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
