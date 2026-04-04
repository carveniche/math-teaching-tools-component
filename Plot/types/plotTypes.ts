export interface LineTextType {
    xlavel: string;
    ylavel: string;
}

export interface BarLineTextType {
    xlavelBarPlot: string;
    ylavelBarPlot: string;
}

export interface BarError {
    xlavelBarPlotError: boolean;
    ylavelBarPlotError: boolean;
    XMarkersBarPlotError: boolean;
    yMarkersBarPlotError: boolean;
    xlavelBarPlotEmptyError: boolean;
    ylavelBarPlotEmptyError: boolean;
    XMarkersBarPlotEmptyError: boolean;
}

export interface LineError {
    xlavelLinePlotError: boolean;
    ylavelLinePlotError: boolean;
    XMarkersLinePlotError: boolean;
    xlavelLinePlotEmptyError: boolean;
    ylavelLinePlotEmptyError: boolean;
    XMarkersLinePlotEmptyError: boolean;
}

export type Props = {
    isLiveClass?: boolean;
    role_name: string;
    Data?: any;
};

export type HandleDataTrackProp = (data: any) => void;

export interface PlotContextType {
    lineText: LineTextType;
    setLineText: (value: LineTextType) => void;

    xMarkers: string[];
    setXMarkers: (value: string[]) => void;

    xMarkersBarPlot: string[];
    setXMarkersBarPlot: (value: string[]) => void;

    barLineText: BarLineTextType;
    setBarLineText: (value: BarLineTextType) => void;

    yMarkersBarPlot: number[];
    setyMarkersBarPlot: (value: number[]) => void;

    pictureGraph: string;
    setPictureGraph: (value: string) => void;

    barerror: BarError;
    setBarError: React.Dispatch<React.SetStateAction<BarError>>;

    state: {
        toggleSetting: boolean;
    };
    setState: React.Dispatch<
        React.SetStateAction<{ toggleSetting: boolean }>
    >;

    linerror: LineError;
    setLineError: React.Dispatch<
        React.SetStateAction<LineError>
    >;

    teamCounts: number[];
    setTeamCounts: (v: number[]) => void;

    CATEGORY_CONFIG: Record<
        string,
        { headers: string[]; rows: string[] }
    >;

    IMAGE_MAP: Record<
        string,
        { faded: string; colour: string }
    >;

    isLiveClass: boolean;
    role_Name: string;

    filledUpTo: number[];
    setFilledUpTo: (v: number[]) => void;

    teamCountsBar: number[];
    setTeamCountsBar: (v: number[]) => void;

    teamCountsLine: number[];
    setTeamCountsLine: (v: number[]) => void;
}