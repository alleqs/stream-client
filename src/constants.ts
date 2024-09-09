
export const camsPerView = 4;

export const arMap: Record<string, string> = {
   '16/9': 'aspect-[16/9]',
   '22/15': 'aspect-[22/15]'
};

export const defaultFreezedTime = 30;
export const minFreezedTime = 15;
export const defaultTimerEnabled = false;
export const deltaTimer = 5;


// const request = new XMLHttpRequest();
// request.open("GET", "/cams-amount", false);
// request.send(null);
// const json = request.responseText;

// export const { camsAmount } = JSON.parse(json) as { camsAmount: number }

// export const colors = [
//    'Aqua',
//    'Blue',
//    'DarkBlue',
//    'Cyan',
//    'DarkSlateBlue',
//    'DodgerBlue',
//    'LightSkyBlue',
//    'Aqua',
//    'Blue',
//    'DarkBlue',
//    'Cyan',
//    'DarkSlateBlue',
//    'Blue',
//    'DarkBlue',
//    'Cyan',
//    'DarkSlateBlue',
// ]