import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface LineTextType {
  xlavel: string;
  ylavel: string;
}
type Props = {
  isLiveClass?: boolean;
  role_name: string
  Data?: any
};
type HandleDataTrackProp = (data: any) => void;

interface BarLineTextType {
  xlavelBarPlot: string;
  ylavelBarPlot: string;
}
interface BarError {
  xlavelBarPlotError: boolean,
  ylavelBarPlotError: boolean,
  XMarkersBarPlotError: boolean,
  yMarkersBarPlotError: boolean,
  xlavelBarPlotEmptyError: boolean,
  ylavelBarPlotEmptyError: boolean,
  XMarkersBarPlotEmptyError: boolean,
}

interface lineError {
  xlavelLinePlotError: boolean,
  ylavelLinePlotError: boolean,
  XMarkersLinePlotError: boolean,
  xlavelLinePlotEmptyError: boolean,
  ylavelLinePlotEmptyError: boolean,
  XMarkersLinePlotEmptyError: boolean,
}

interface PlotContextType {
  lineText: LineTextType;
  setLineText: (value: LineTextType) => void;
  xMarkers: string[];
  setXMarkers: (value: string[]) => void;
  xMarkersBarPlot: string[];
  setXMarkersBarPlot: (value: string[]) => void;
  barLineText: BarLineTextType;
  setBarLineText: (value: BarLineTextType) => void;
  yMarkersBarPlot: number[],
  setyMarkersBarPlot: (value: number[]) => void;
  pictureGraph: string;
  setPictureGraph: (value: string) => void;
  barerror: BarError,
  setBarError: React.Dispatch<React.SetStateAction<BarError>>;
  state: {
    toggleSetting: boolean;
  };
  setState: React.Dispatch<React.SetStateAction<{ toggleSetting: boolean }>>;
  linerror: lineError;
  setLineError: React.Dispatch<React.SetStateAction<lineError>>;
  teamCounts: number[];
  setTeamCounts: (v: number[]) => void;
  CATEGORY_CONFIG: Record<string, { headers: string[]; rows: string[] }>;
  IMAGE_MAP: Record<string, { faded: string; colour: string }>;
  isLiveClass: boolean;
  role_Name: string;
  filledUpTo: number[];
  setFilledUpTo: (v: number[]) => void;
  teamCountsBar: number[];
  setTeamCountsBar: (v: number[]) => void;
  setTeamCountsLine: (v: number[]) => void;
  teamCountsLine: number[]

}

const CATEGORY_CONFIG: Record<string, { headers: string[]; rows: string[] }> = {
  "Sea Creatures": {
    headers: ["Favorite Sea Creatures", "Number of Students"],
    rows: ["Dolphin", "Jellyfish", "Turtle", "Octopus"],
  },
  "Ice Cream": {
    headers: ["Favorite Ice Cream Flavors", "Number of Students"],
    rows: ["Vanilla", "Chocolate", "Strawberry", "Butterscotch"],
  },
  "Cold Drink": {
    headers: ["Favorite Cold Drinks", "Number of Students"],
    rows: ["Lemonade", "Iced Tea", "Soda", "Fruit Punch"],
  },
  Cake: {
    headers: ["Favorite Cake Flavors", "Number of Students"],
    rows: ["Chocolate", "Vanilla", "Red Velvet", "Black Forest"],
  },
  Donut: {
    headers: ["Favorite Donuts", "Number of Students"],
    rows: ["Glazed", "Chocolate", "Sprinkles", "Jelly"],
  },
  Chocolate: {
    headers: ["Favorite Chocolates", "Number of Students"],
    rows: ["Dark", "Milk", "White", "Caramel"],
  },
};

const IMAGE_MAP: Record<string, { faded: string; colour: string }> = {
  "Sea Creatures": {
    faded: "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/fishFaded.svg",
    colour: "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/colorFish.svg",
  },
  "Ice Cream": {
    faded:
      "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/iceCreamlight.png",
    colour:
      "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/iceCreamPlaceholder.png",
  },
  "Cold Drink": {
    faded: "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/drink.png",
    colour:
      "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/drinkColour.png",
  },
  Donut: {
    faded:
      "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/disabledonut.png",
    colour:
      "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/enabledonut.png",
  },
  Chocolate: {
    faded: "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/disablecho.png",
    colour:
      "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/enablechocalate.png",
  },
  Cake: {
    faded:
      "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/disablecake.png",
    colour:
      "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/enablecake.png",
  },
};

const PlotContext = createContext<PlotContextType | undefined>(undefined);

export const PlotProvider = ({ children, props, handleDataTrack, graph }: { children: ReactNode, props: Props, handleDataTrack: HandleDataTrackProp, graph: string }) => {



  const [lineText, setLineText] = useState({
    xlavel: "Books Read",
    ylavel: "Number of Students",
  })
  const [barLineText, setBarLineText] = useState({
    xlavelBarPlot: "Sections",
    ylavelBarPlot: "Number of Workshops",
  })
  const [state, setState] = useState({ toggleSetting: false });
  const [xMarkers, setXMarkers] = useState<string[]>(["1", "2", "3", "4"]);
  const [xMarkersBarPlot, setXMarkersBarPlot] = useState<string[]>(["A", "B", "C", "D"]);
  const [yMarkersBarPlot, setyMarkersBarPlot] = useState<number[]>([0, 1, 2, 3, 4]);
  const [pictureGraph, setPictureGraph] = useState<string>("Ice Cream");
  const [isLiveClass, setIsLiveClass] = useState(false)
  const [role_Name, setRole_Name] = useState<string>("tutor");
  const [teamCounts, setTeamCounts] = useState<number[]>(
    Array(4).fill(0)
  );


  const [filledUpTo, setFilledUpTo] = useState(Array(xMarkersBarPlot.length).fill(-1));
  const [teamCountsBar, setTeamCountsBar] = useState(Array(xMarkersBarPlot.length).fill(-1));
  const [teamCountsLine, setTeamCountsLine] = useState<number[]>(Array(xMarkers.length).fill(0));

  const [barerror, setBarError] = useState({
    xlavelBarPlotError: false,
    ylavelBarPlotError: false,
    XMarkersBarPlotError: false,
    yMarkersBarPlotError: false,
    xlavelBarPlotEmptyError: false,
    ylavelBarPlotEmptyError: false,
    XMarkersBarPlotEmptyError: false,
  })
  const [linerror, setLineError] = useState({
    xlavelLinePlotError: false,
    ylavelLinePlotError: false,
    XMarkersLinePlotError: false,
    xlavelLinePlotEmptyError: false,
    ylavelLinePlotEmptyError: false,
    XMarkersLinePlotEmptyError: false,

  })

  const isAcessTeacher = isLiveClass && role_Name === "tutor"

  const isAccessStudent = isLiveClass && role_Name !== "tutor"

  useEffect(() => {
    if (props?.isLiveClass && props?.role_name) {
      setIsLiveClass(props.isLiveClass)
      setRole_Name(props?.role_name)
    }
  }, [props?.isLiveClass, props?.role_name])

  useEffect(() => {
    if (graph !== "Picture Graph") return;

    if (!isAccessStudent) return;
    if (!props?.Data) return;


    const { pictureGraph, teamCounts } = props.Data;

    if (pictureGraph) {
      setPictureGraph(pictureGraph);
    }

    if (teamCounts) {
      setTeamCounts(teamCounts);
    }

  }, [props?.Data, isAccessStudent, graph]);

  useEffect(() => {
    if (isAcessTeacher && pictureGraph && graph === "Picture Graph") {
      handleDataTrack?.({
        isFrom: "pictureGraph",
        data: pictureGraph
      });
    }
  }, [pictureGraph, isLiveClass, graph]);

  useEffect(() => {
    if (isAcessTeacher && teamCounts && graph === "Picture Graph") {
      handleDataTrack?.({
        isFrom: "teamCounts",
        data: teamCounts
      });
    }
  }, [teamCounts, isLiveClass, graph]);

  useEffect(() => {
    if (graph === "Bar Graph" && isAcessTeacher) {
      handleDataTrack?.({
        isFrom: "filledUpTo",
        data: filledUpTo
      });
    }

  }, [graph, isLiveClass, filledUpTo])

  useEffect(() => {
    if (graph === "Bar Graph" && isAcessTeacher) {
      handleDataTrack?.({
        isFrom: "teamCountsBar",
        data: teamCountsBar
      });
    }

  }, [graph, isLiveClass, teamCountsBar])

  useEffect(() => {
    if (graph !== "Bar Graph") return;
    if (!isAccessStudent) return;
    if (!props?.Data) return;
    const { filledUpTo, teamCountsBar } = props.Data;
    if (filledUpTo) {
      setFilledUpTo(filledUpTo)
    }
    if (teamCountsBar) {
      setTeamCountsBar(teamCountsBar)
    }


  }, [props?.Data, isAccessStudent, graph]);

  useEffect(() => {
    if (graph === "Line Plot" && isAcessTeacher) {
      handleDataTrack?.({
        isFrom: "teamCountsLine",
        data: teamCountsLine
      });
    }

  }, [graph, isLiveClass, teamCountsLine])
  useEffect(() => {
    if (graph !== "Line Plot") return;
    if (!isAccessStudent) return;
    if (!props?.Data) return;
    const { teamCountsLine } = props.Data;
    if (teamCountsLine) {
      setTeamCountsLine(teamCountsLine)
    }



  }, [props?.Data, isAccessStudent, graph]);

  const value = {
    lineText,
    setLineText,
    xMarkers,
    setXMarkers,
    xMarkersBarPlot,
    setXMarkersBarPlot,
    barLineText, setBarLineText,
    yMarkersBarPlot, setyMarkersBarPlot,
    pictureGraph, setPictureGraph,
    barerror, setBarError,
    state, setState,
    linerror, setLineError,
    teamCounts, setTeamCounts,
    CATEGORY_CONFIG, IMAGE_MAP,
    role_Name, isLiveClass,
    filledUpTo, setFilledUpTo,
    teamCountsBar, setTeamCountsBar,
    teamCountsLine, setTeamCountsLine,
  }

  return (
    <PlotContext.Provider value={value}>
      {children}
    </PlotContext.Provider>
  );
};

export const usePlotContext = (): PlotContextType => {
  const context = useContext(PlotContext);
  if (!context) throw new Error("usePlotContext must be used within a PlotProvider");
  return context;
};
