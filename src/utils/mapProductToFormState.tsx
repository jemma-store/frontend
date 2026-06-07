const METAL_MAP: Record<string, string> = {
  "Золото_Білий": "WHITE_GOLD",
  "Золото_Жовтий": "YELOW_GOLD",
  "Золото": "YELOW_GOLD", 
  "Срібло": "SILVER",
  "Платина": "PLATINUM"
};

const STONE_MAP: Record<string, string> = {
  "Фіаніт": "PHIANIT",
  "Сапфір": "SAPFIR",
  "Діамант": "DIAMOND",
};

export const mapProductToFormState = (product: any) => {
  const characteristic = product.description.characteristic;

  const compositeKey = characteristic.color 
    ? `${characteristic.metal}_${characteristic.color}` 
    : characteristic.metal;

  const metalValue = METAL_MAP[compositeKey] || METAL_MAP[characteristic.metal] || "";

  const rawStones = characteristic.stone 
    ? characteristic.stone.split(',').map((s: string) => s.trim()) 
    : [];

  const stoneKeys = rawStones.map((name: string) => STONE_MAP[name] || "").filter(Boolean);

  return {
    ...product,
    images: product.images || [],
    description: {
      ...product.description,
      characteristic: {
        ...characteristic,
        metal: metalValue,
        stones: stoneKeys.length > 0 ? stoneKeys : [""],
      }
    }
  };
};