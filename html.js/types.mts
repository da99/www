/// <reference no-default-lib="true"

export type Response_Handler = (resp: Response_Origin, req: Request_Origin) => void;
export const Response_States = ['ok', 'invalid', 'try_again', 'not_yet', 'expired'] as const;
export const Event_States = ['request', 'network_error', 'server_error', 'response', 'loading'] as const;
export const CSS_States = [...Response_States, ...Event_States] as const;

export interface Request_Origin {
  readonly request: RequestInit,
  readonly dom_id: string,
  do_request: boolean
}

export interface Response_Origin {
  readonly status: typeof Response_States[number],
  readonly data: {
    [index: string]: string
  }
}

export interface Response_Detail {
  request: Request_Origin,
  response: Response_Origin,
}

export interface Network_Error_Origin {
  error: any,
  request: Request_Origin
}
export interface DataSet {
  data: {[key: string]: string | number}
}

export type Attrs<T extends keyof ElementTagNameMap> = Partial<ElementTagNameMap[T] & DataSet>;

export interface AttrElement  {
  classList: string[];
  id: string;
  readonly namespaceURI: string | null;
  autofocus: boolean;
  accessKey: string;
  readonly accessKeyLabel: string;
  autocapitalize: string;
  dir: string;
  draggable: boolean;
  hidden: boolean;
  inert: boolean;
  innerText: string;
  lang: string;
  popover: string | null;
  spellcheck: boolean;
  title: string;
  translate: boolean;
}


interface HTMLAnchorElement extends AttrElement, HTMLHyperlinkElementUtils {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/download) */
    download: string;
    /**
     * Sets or retrieves the language code of the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/hreflang)
     */
    hreflang: string;
    ping: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/referrerPolicy) */
    referrerPolicy: string;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/rel)
     */
    rel: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/relList) */
    readonly relList: DOMTokenList;
    /**
     * Sets or retrieves the window or frame at which to target content.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/target)
     */
    target: string;
    /**
     * Retrieves or sets the text of the object as a string.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/text)
     */
    text: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/type) */
    type: string;
}


/**
 * Provides special properties and methods (beyond those of the regular object HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of <area> elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement)
 */
interface HTMLAreaElement extends AttrElement, HTMLHyperlinkElementUtils {
    /**
     * Sets or retrieves a text alternative to the graphic.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/alt)
     */
    alt: string;
    /**
     * Sets or retrieves the coordinates of the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/coords)
     */
    coords: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/download) */
    download: string;
    ping: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/referrerPolicy) */
    referrerPolicy: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/rel) */
    rel: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/relList) */
    readonly relList: DOMTokenList;
    /**
     * Sets or retrieves the shape of the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/shape)
     */
    shape: string;
    /**
     * Sets or retrieves the window or frame at which to target content.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/target)
     */
    target: string;
}


/**
 * Provides access to the properties of <audio> elements, as well as methods to manipulate them. It derives from the HTMLMediaElement interface.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAudioElement)
 */
interface HTMLAudioElement extends HTMLMediaElement {
}


/**
 * A HTML line break element (<br>). It inherits from HTMLElement.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLBRElement)
 */
interface HTMLBRElement extends AttrElement {
}


/**
 * Contains the base URI for a document. This object inherits all of the properties and methods as described in the HTMLElement interface.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLBaseElement)
 */
interface HTMLBaseElement extends AttrElement {
    /**
     * Gets or sets the baseline URL on which relative links are based.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLBaseElement/href)
     */
    href: string;
    /**
     * Sets or retrieves the window or frame at which to target content.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLBaseElement/target)
     */
    target: string;
}



/**
 * Provides special properties (beyond those inherited from the regular HTMLElement interface) for manipulating <body> elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLBodyElement)
 */
interface HTMLBodyElement extends AttrElement {
}

/**
 * Provides properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating <button> elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement)
 */
interface HTMLButtonElement extends AttrElement {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/disabled) */
    disabled: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/form)
     */
    readonly form: HTMLFormElement | null;
    /**
     * Overrides the action attribute (where the data on a form is sent) on the parent form element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/formAction)
     */
    formAction: string;
    /**
     * Used to override the encoding (formEnctype attribute) specified on the form element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/formEnctype)
     */
    formEnctype: string;
    /**
     * Overrides the submit method attribute previously specified on a form element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/formMethod)
     */
    formMethod: string;
    /**
     * Overrides any validation or required attributes on a form or form elements to allow it to be submitted without validation. This can be used to create a "save draft"-type submit option.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/formNoValidate)
     */
    formNoValidate: boolean;
    /**
     * Overrides the target attribute on a form element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/formTarget)
     */
    formTarget: string;
    /**
     * Sets or retrieves the name of the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/name)
     */
    name: string;
    /**
     * Gets the classification and default behavior of the button.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/type)
     */
    type: "submit" | "reset" | "button";
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/validationMessage)
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/validity)
     */
    readonly validity: ValidityState;
    /**
     * Sets or retrieves the default or selected value of the control.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/value)
     */
    value: string;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/willValidate)
     */
    readonly willValidate: boolean;
    /** Returns whether a form will validate when it is submitted, without having to submit it. */
    checkValidity(): boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/reportValidity) */
    reportValidity(): boolean;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
}


/**
 * Provides properties and methods for manipulating the layout and presentation of <canvas> elements. The HTMLCanvasElement interface also inherits the properties and methods of the HTMLElement interface.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement)
 */
interface HTMLCanvasElement extends AttrElement {
    /**
     * Gets or sets the height of a canvas element on a document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/height)
     */
    height: number;
    /**
     * Gets or sets the width of a canvas element on a document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/width)
     */
    width: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/captureStream) */
    captureStream(frameRequestRate?: number): MediaStream;
    /**
     * Returns an object that provides methods and properties for drawing and manipulating images and graphics on a canvas element in a document. A context object includes information about colors, line widths, fonts, and other graphic parameters that can be drawn on a canvas.
     * @param contextId The identifier (ID) of the type of canvas to create. Internet Explorer 9 and Internet Explorer 10 support only a 2-D context using canvas.getContext("2d"); IE11 Preview also supports 3-D or WebGL context using canvas.getContext("experimental-webgl");
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/getContext)
     */
    getContext(contextId: "2d", options?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D | null;
    getContext(contextId: "bitmaprenderer", options?: ImageBitmapRenderingContextSettings): ImageBitmapRenderingContext | null;
    getContext(contextId: "webgl", options?: WebGLContextAttributes): WebGLRenderingContext | null;
    getContext(contextId: "webgl2", options?: WebGLContextAttributes): WebGL2RenderingContext | null;
    getContext(contextId: string, options?: any): RenderingContext | null;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/toBlob) */
    toBlob(callback: BlobCallback, type?: string, quality?: any): void;
    /**
     * Returns the content of the current canvas as an image that you can use as a source for another canvas or an HTML element.
     * @param type The standard MIME type for the image format to return. If you do not specify this parameter, the default value is a PNG format image.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/toDataURL)
     */
    toDataURL(type?: string, quality?: any): string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/transferControlToOffscreen) */
    transferControlToOffscreen(): OffscreenCanvas;
}


/**
 * A generic collection (array-like object similar to arguments) of elements (in document order) and offers methods and properties for selecting from the list.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCollection)
 */
interface HTMLCollectionBase {
    /**
     * Sets or retrieves the number of objects in a collection.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCollection/length)
     */
    readonly length: number;
    /**
     * Retrieves an object from various collections.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCollection/item)
     */
    item(index: number): Element | null;
    [index: number]: Element;
}

interface HTMLCollection extends HTMLCollectionBase {
    /**
     * Retrieves a select object or an object from an options collection.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCollection/namedItem)
     */
    namedItem(name: string): Element | null;
}


/**
 * Provides special properties (beyond those of the regular HTMLElement interface it also has available to it by inheritance) for manipulating definition list (<dl>) elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDListElement)
 */
interface HTMLDListElement extends AttrElement {
}


/**
 * Provides special properties (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating <data> elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDataElement)
 */
interface HTMLDataElement extends AttrElement {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDataElement/value) */
    value: string;
}


/**
 * Provides special properties (beyond the HTMLElement object interface it also has available to it by inheritance) to manipulate <datalist> elements and their content.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDataListElement)
 */
interface HTMLDataListElement extends AttrElement {
    /**
     * Returns an HTMLCollection of the option elements of the datalist element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDataListElement/options)
     */
}


/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDetailsElement) */
interface HTMLDetailsElement extends AttrElement {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDetailsElement/open) */
    open: boolean;
}


/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement) */
interface HTMLDialogElement extends AttrElement {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/open) */
    open: boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/returnValue) */
    returnValue: string;
    /**
     * Closes the dialog element.
     *
     * The argument, if provided, provides a return value.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/close)
     */
    close(returnValue?: string): void;
    /**
     * Displays the dialog element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/show)
     */
    show(): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/showModal) */
    showModal(): void;
}


interface HTMLDivElement extends AttrElement {
}

interface HTMLEmbedElement extends AttrElement {
    /** Sets or retrieves the height of the object. */
    height: string;
    /** Sets or retrieves a URL to be loaded by the object. */
    src: string;
    type: string;
    /** Sets or retrieves the width of the object. */
    width: string;
    getSVGDocument(): Document | null;
}


/**
 * Provides special properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of <fieldset> elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFieldSetElement)
 */
interface HTMLFieldSetElement extends AttrElement {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFieldSetElement/disabled) */
    disabled: boolean;
    /**
     * Returns an HTMLCollection of the form controls in the element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFieldSetElement/elements)
     */
    readonly elements: HTMLCollection;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFieldSetElement/form)
     */
    readonly form: HTMLFormElement | null;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFieldSetElement/name) */
    name: string;
    /**
     * Returns the string "fieldset".
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFieldSetElement/type)
     */
    readonly type: string;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFieldSetElement/validationMessage)
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFieldSetElement/validity)
     */
    readonly validity: ValidityState;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFieldSetElement/willValidate)
     */
    readonly willValidate: boolean;
    /** Returns whether a form will validate when it is submitted, without having to submit it. */
    checkValidity(): boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFieldSetElement/reportValidity) */
    reportValidity(): boolean;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
}




/**
 * A <form> element in the DOM; it allows access to and in some cases modification of aspects of the form, as well as access to its component elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement)
 */
interface HTMLFormElement extends AttrElement {
    /**
     * Sets or retrieves a list of character encodings for input data that must be accepted by the server processing the form.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/acceptCharset)
     */
    acceptCharset: string;
    /**
     * Sets or retrieves the URL to which the form content is sent for processing.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/action)
     */
    action: string;
    /**
     * Specifies whether autocomplete is applied to an editable text field.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/autocomplete)
     */
    autocomplete: AutoFillBase;
    /**
     * Retrieves a collection, in source order, of all controls in a given form.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/elements)
     */
    readonly elements: HTMLFormControlsCollection;
    /**
     * Sets or retrieves the MIME encoding for the form.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/encoding)
     */
    encoding: string;
    /**
     * Sets or retrieves the encoding type for the form.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/enctype)
     */
    enctype: string;
    /**
     * Sets or retrieves the number of objects in a collection.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/length)
     */
    readonly length: number;
    /**
     * Sets or retrieves how to send the form data to the server.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/method)
     */
    method: string;
    /**
     * Sets or retrieves the name of the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/name)
     */
    name: string;
    /**
     * Designates a form that is not validated when submitted.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/noValidate)
     */
    noValidate: boolean;
    rel: string;
    readonly relList: DOMTokenList;
    /**
     * Sets or retrieves the window or frame at which to target content.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/target)
     */
    target: string;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/checkValidity)
     */
    checkValidity(): boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/reportValidity) */
    reportValidity(): boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/requestSubmit) */
    requestSubmit(submitter?: AttrElement | null): void;
    /**
     * Fires when the user resets a form.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/reset)
     */
    reset(): void;
    /**
     * Fires when a FORM is about to be submitted.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/submit)
     */
    submit(): void;
    [index: number]: Element;
    [name: string]: any;
}






/**
 * Provides special properties (beyond those of the HTMLElement interface it also has available to it by inheritance) for manipulating <hr> elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLHRElement)
 */
interface HTMLHRElement extends AttrElement {
}


/**
 * Contains the descriptive information, or metadata, for a document. This object inherits all of the properties and methods described in the HTMLElement interface.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLHeadElement)
 */
interface HTMLHeadElement extends AttrElement {
}


/**
 * The different heading elements. It inherits methods and properties from the HTMLElement interface.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLHeadingElement)
 */
interface HTMLHeadingElement extends AttrElement {
}

/**
 * Serves as the root node for a given HTML document. This object inherits the properties and methods described in the HTMLElement interface.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLHtmlElement)
 */
interface HTMLHtmlElement extends AttrElement {
}


interface HTMLHyperlinkElementUtils {
    /**
     * Returns the hyperlink's URL's fragment (includes leading "#" if non-empty).
     *
     * Can be set, to change the URL's fragment (ignores leading "#").
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/hash)
     */
    hash: string;
    /**
     * Returns the hyperlink's URL's host and port (if different from the default port for the scheme).
     *
     * Can be set, to change the URL's host and port.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/host)
     */
    host: string;
    /**
     * Returns the hyperlink's URL's host.
     *
     * Can be set, to change the URL's host.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/hostname)
     */
    hostname: string;
    /**
     * Returns the hyperlink's URL.
     *
     * Can be set, to change the URL.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/href)
     */
    href: string;
    toString(): string;
    /**
     * Returns the hyperlink's URL's origin.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/origin)
     */
    readonly origin: string;
    /**
     * Returns the hyperlink's URL's password.
     *
     * Can be set, to change the URL's password.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/password)
     */
    password: string;
    /**
     * Returns the hyperlink's URL's path.
     *
     * Can be set, to change the URL's path.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/pathname)
     */
    pathname: string;
    /**
     * Returns the hyperlink's URL's port.
     *
     * Can be set, to change the URL's port.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/port)
     */
    port: string;
    /**
     * Returns the hyperlink's URL's scheme.
     *
     * Can be set, to change the URL's scheme.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/protocol)
     */
    protocol: string;
    /**
     * Returns the hyperlink's URL's query (includes leading "?" if non-empty).
     *
     * Can be set, to change the URL's query (ignores leading "?").
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/search)
     */
    search: string;
    /**
     * Returns the hyperlink's URL's username.
     *
     * Can be set, to change the URL's username.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/username)
     */
    username: string;
}


/**
 * Provides special properties and methods for manipulating <img> elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
 */
interface HTMLImageElement extends AttrElement {
    /**
     * Sets or retrieves a text alternative to the graphic.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/alt)
     */
    alt: string;
    /**
     * Retrieves whether the object is fully loaded.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/complete)
     */
    readonly complete: boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/crossOrigin) */
    crossOrigin: string | null;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/currentSrc) */
    readonly currentSrc: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/decoding) */
    decoding: "async" | "sync" | "auto";
    /**
     * Sets or retrieves the height of the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/height)
     */
    height: number;
    /**
     * Sets or retrieves whether the image is a server-side image map.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/isMap)
     */
    isMap: boolean;
    /**
     * Sets or retrieves the policy for loading image elements that are outside the viewport.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/loading)
     */
    loading: "eager" | "lazy";
    /**
     * The original height of the image resource before sizing.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/naturalHeight)
     */
    readonly naturalHeight: number;
    /**
     * The original width of the image resource before sizing.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/naturalWidth)
     */
    readonly naturalWidth: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/referrerPolicy) */
    referrerPolicy: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/sizes) */
    sizes: string;
    /**
     * The address or URL of the a media resource that is to be considered.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/src)
     */
    src: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/srcset) */
    srcset: string;
    /**
     * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/useMap)
     */
    useMap: string;
    /**
     * Sets or retrieves the width of the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/width)
     */
    width: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/x) */
    readonly x: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/y) */
    readonly y: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/decode) */
    decode(): Promise<void>;
}

/**
 * Provides special properties and methods for manipulating the options, layout, and presentation of <input> elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement)
 */
interface HTMLInputElement extends AttrElement, PopoverInvokerElement {
    /** Sets or retrieves a comma-separated list of content types. */
    accept: string;
    /** Sets or retrieves a text alternative to the graphic. */
    alt: string;
    /**
     * Specifies whether autocomplete is applied to an editable text field.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/autocomplete)
     */
    autocomplete: AutoFill;
    capture: string;
    /** Sets or retrieves the state of the check box or radio button. */
    checked: boolean;
    /** Sets or retrieves the state of the check box or radio button. */
    defaultChecked: boolean;
    /** Sets or retrieves the initial contents of the object. */
    defaultValue: string;
    dirName: string;
    disabled: boolean;
    /**
     * Returns a FileList object on a file type input object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/files)
     */
    files: FileList | null;
    /** Retrieves a reference to the form that the object is embedded in. */
    readonly form: HTMLFormElement | null;
    /**
     * Overrides the action attribute (where the data on a form is sent) on the parent form element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/formAction)
     */
    formAction: string;
    /**
     * Used to override the encoding (formEnctype attribute) specified on the form element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/formEnctype)
     */
    formEnctype: string;
    /**
     * Overrides the submit method attribute previously specified on a form element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/formMethod)
     */
    formMethod: string;
    /**
     * Overrides any validation or required attributes on a form or form elements to allow it to be submitted without validation. This can be used to create a "save draft"-type submit option.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/formNoValidate)
     */
    formNoValidate: boolean;
    /**
     * Overrides the target attribute on a form element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/formTarget)
     */
    formTarget: string;
    /**
     * Sets or retrieves the height of the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/height)
     */
    height: number;
    /**
     * When set, overrides the rendering of checkbox controls so that the current value is not visible.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/indeterminate)
     */
    indeterminate: boolean;
    /**
     * Specifies the ID of a pre-defined datalist of options for an input element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/list)
     */
    readonly list: HTMLDataListElement | null;
    /** Defines the maximum acceptable value for an input element with type="number".When used with the min and step attributes, lets you control the range and increment (such as only even numbers) that the user can enter into an input field. */
    max: string;
    /** Sets or retrieves the maximum number of characters that the user can enter in a text control. */
    maxLength: number;
    /** Defines the minimum acceptable value for an input element with type="number". When used with the max and step attributes, lets you control the range and increment (such as even numbers only) that the user can enter into an input field. */
    min: string;
    minLength: number;
    /**
     * Sets or retrieves the Boolean value indicating whether multiple items can be selected from a list.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/multiple)
     */
    multiple: boolean;
    /** Sets or retrieves the name of the object. */
    name: string;
    /**
     * Gets or sets a string containing a regular expression that the user's input must match.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/pattern)
     */
    pattern: string;
    /**
     * Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or type of information they need to enter.The text appears in an input field until the user puts focus on the field.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/placeholder)
     */
    placeholder: string;
    readOnly: boolean;
    /**
     * When present, marks an element that can't be submitted without a value.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/required)
     */
    required: boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/selectionDirection) */
    selectionDirection: "forward" | "backward" | "none" | null;
    /** Gets or sets the end position or offset of a text selection. */
    selectionEnd: number | null;
    /** Gets or sets the starting position or offset of a text selection. */
    selectionStart: number | null;
    size: number;
    /** The address or URL of the a media resource that is to be considered. */
    src: string;
    /** Defines an increment or jump between values that you want to allow the user to enter. When used with the max and min attributes, lets you control the range and increment (for example, allow only even numbers) that the user can enter into an input field. */
    step: string;
    /** Returns the content type of the object. */
    type: string;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/validationMessage)
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/validity)
     */
    readonly validity: ValidityState;
    /** Returns the value of the data at the cursor's current position. */
    value: string;
    /** Returns a Date object representing the form control's value, if applicable; otherwise, returns null. Can be set, to change the value. Throws an "InvalidStateError" DOMException if the control isn't date- or time-based. */
    valueAsDate: Date | null;
    /** Returns the input field value as a number. */
    valueAsNumber: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/webkitEntries) */
    readonly webkitEntries: ReadonlyArray<FileSystemEntry>;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/webkitdirectory) */
    webkitdirectory: boolean;
    /**
     * Sets or retrieves the width of the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/width)
     */
    width: number;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/willValidate)
     */
    readonly willValidate: boolean;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/checkValidity)
     */
    checkValidity(): boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/reportValidity) */
    reportValidity(): boolean;
    /**
     * Makes the selection equal to the current object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/select)
     */
    select(): void;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/setCustomValidity)
     */
    setCustomValidity(error: string): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/setRangeText) */
    setRangeText(replacement: string): void;
    setRangeText(replacement: string, start: number, end: number, selectionMode?: SelectionMode): void;
    /**
     * Sets the start and end positions of a selection in a text field.
     * @param start The offset into the text field for the start of the selection.
     * @param end The offset into the text field for the end of the selection.
     * @param direction The direction in which the selection is performed.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/setSelectionRange)
     */
    setSelectionRange(start: number | null, end: number | null, direction?: "forward" | "backward" | "none"): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/showPicker) */
    showPicker(): void;
    /**
     * Decrements a range input control's value by the value given by the Step attribute. If the optional parameter is used, it will decrement the input control's step value multiplied by the parameter's value.
     * @param n Value to decrement the value by.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/stepDown)
     */
    stepDown(n?: number): void;
    /**
     * Increments a range input control's value by the value given by the Step attribute. If the optional parameter is used, will increment the input control's value by that value.
     * @param n Value to increment the value by.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/stepUp)
     */
    stepUp(n?: number): void;
}

/**
 * Exposes specific properties and methods (beyond those defined by regular HTMLElement interface it also has available to it by inheritance) for manipulating list elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLIElement)
 */
interface HTMLLIElement extends AttrElement {
    /** Sets or retrieves the value of a list item. */
    value: number;
}

/**
 * Gives access to properties specific to <label> elements. It inherits methods and properties from the base HTMLElement interface.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLabelElement)
 */
interface HTMLLabelElement extends AttrElement {
    /**
     * Returns the form control that is associated with this element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLabelElement/control)
     */
    readonly control: AttrElement | null;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLabelElement/form)
     */
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves the object to which the given label object is assigned.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLabelElement/htmlFor)
     */
    htmlFor: string;
}

/**
 * The HTMLLegendElement is an interface allowing to access properties of the <legend> elements. It inherits properties and methods from the HTMLElement interface.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLegendElement)
 */
interface HTMLLegendElement extends AttrElement {
    readonly form: HTMLFormElement | null;
}

/**
 * Reference information for external resources and the relationship of those resources to a document and vice-versa. This object inherits all of the properties and methods of the HTMLElement interface.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement)
 */
interface HTMLLinkElement extends AttrElement, LinkStyle {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement/as) */
    as: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement/crossOrigin) */
    crossOrigin: string | null;
    disabled: boolean;
    /** Sets or retrieves a destination URL or an anchor point. */
    href: string;
    /** Sets or retrieves the language code of the object. */
    hreflang: string;
    imageSizes: string;
    imageSrcset: string;
    integrity: string;
    /** Sets or retrieves the media type. */
    media: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement/referrerPolicy) */
    referrerPolicy: string;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement/rel)
     */
    rel: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement/relList) */
    readonly relList: DOMTokenList;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement/sizes) */
    readonly sizes: DOMTokenList;
    /** Sets or retrieves the MIME type of the object. */
    type: string;
}


/**
 * Provides special properties and methods (beyond those of the regular object HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of map elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMapElement)
 */
interface HTMLMapElement extends AttrElement {
    /**
     * Retrieves a collection of the area objects defined for the given map object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMapElement/areas)
     */
    readonly areas: HTMLCollection;
    /**
     * Sets or retrieves the name of the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMapElement/name)
     */
    name: string;
}




/**
 * Adds to HTMLElement the properties and methods needed to support basic media-related capabilities that are common to audio and video.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement)
 */
interface HTMLMediaElement extends AttrElement {
    /**
     * Gets or sets a value that indicates whether to start playing the media automatically.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/autoplay)
     */
    autoplay: boolean;
    /**
     * Gets a collection of buffered time ranges.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/buffered)
     */
    readonly buffered: TimeRanges;
    /**
     * Gets or sets a flag that indicates whether the client provides a set of controls for the media (in case the developer does not include controls for the player).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/controls)
     */
    controls: boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/crossOrigin) */
    crossOrigin: string | null;
    /**
     * Gets the address or URL of the current media resource that is selected by IHTMLMediaElement.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/currentSrc)
     */
    readonly currentSrc: string;
    /**
     * Gets or sets the current playback position, in seconds.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/currentTime)
     */
    currentTime: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/defaultMuted) */
    defaultMuted: boolean;
    /**
     * Gets or sets the default playback rate when the user is not using fast forward or reverse for a video or audio resource.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/defaultPlaybackRate)
     */
    defaultPlaybackRate: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/disableRemotePlayback) */
    disableRemotePlayback: boolean;
    /**
     * Returns the duration in seconds of the current media resource. A NaN value is returned if duration is not available, or Infinity if the media resource is streaming.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/duration)
     */
    readonly duration: number;
    /**
     * Gets information about whether the playback has ended or not.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ended)
     */
    readonly ended: boolean;
    /**
     * Returns an object representing the current error state of the audio or video element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/error)
     */
    readonly error: MediaError | null;
    /**
     * Gets or sets a flag to specify whether playback should restart after it completes.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loop)
     */
    loop: boolean;
    /**
     * Available only in secure contexts.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/mediaKeys)
     */
    readonly mediaKeys: MediaKeys | null;
    /**
     * Gets or sets a flag that indicates whether the audio (either audio or the audio track on video media) is muted.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/muted)
     */
    muted: boolean;
    /**
     * Gets the current network activity for the element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/networkState)
     */
    readonly networkState: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/encrypted_event) */
    onencrypted: ((this: HTMLMediaElement, ev: MediaEncryptedEvent) => any) | null;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/waitingforkey_event) */
    onwaitingforkey: ((this: HTMLMediaElement, ev: Event) => any) | null;
    /**
     * Gets a flag that specifies whether playback is paused.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/paused)
     */
    readonly paused: boolean;
    /**
     * Gets or sets the current rate of speed for the media resource to play. This speed is expressed as a multiple of the normal speed of the media resource.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/playbackRate)
     */
    playbackRate: number;
    /**
     * Gets TimeRanges for the current media resource that has been played.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/played)
     */
    readonly played: TimeRanges;
    /**
     * Gets or sets a value indicating what data should be preloaded, if any.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/preload)
     */
    preload: "none" | "metadata" | "auto" | "";
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/preservesPitch) */
    preservesPitch: boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/readyState) */
    readonly readyState: number;
    readonly remote: RemotePlayback;
    /**
     * Returns a TimeRanges object that represents the ranges of the current media resource that can be seeked.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seekable)
     */
    readonly seekable: TimeRanges;
    /**
     * Gets a flag that indicates whether the client is currently moving to a new playback position in the media resource.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeking)
     */
    readonly seeking: boolean;
    /**
     * The address or URL of the a media resource that is to be considered.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/src)
     */
    src: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/srcObject) */
    srcObject: MediaProvider | null;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/textTracks) */
    readonly textTracks: TextTrackList;
    /**
     * Gets or sets the volume level for audio portions of the media element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/volume)
     */
    volume: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/addTextTrack) */
    addTextTrack(kind: TextTrackKind, label?: string, language?: string): TextTrack;
    /**
     * Returns a string that specifies whether the client can play a given media resource type.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canPlayType)
     */
    canPlayType(type: string): CanPlayTypeResult;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/fastSeek) */
    fastSeek(time: number): void;
    /**
     * Resets the audio or video object and loads a new media resource.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/load)
     */
    load(): void;
    /**
     * Pauses the current playback and sets paused to TRUE. This can be used to test whether the media is playing or paused. You can also use the pause or play events to tell whether the media is playing or not.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/pause)
     */
    pause(): void;
    /**
     * Loads and starts playback of a media resource.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/play)
     */
    play(): Promise<void>;
    /**
     * Available only in secure contexts.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/setMediaKeys)
     */
    setMediaKeys(mediaKeys: MediaKeys | null): Promise<void>;
    readonly NETWORK_EMPTY: 0;
    readonly NETWORK_IDLE: 1;
    readonly NETWORK_LOADING: 2;
    readonly NETWORK_NO_SOURCE: 3;
    readonly HAVE_NOTHING: 0;
    readonly HAVE_METADATA: 1;
    readonly HAVE_CURRENT_DATA: 2;
    readonly HAVE_FUTURE_DATA: 3;
    readonly HAVE_ENOUGH_DATA: 4;
}

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMenuElement) */
interface HTMLMenuElement extends AttrElement {
}


/**
 * Contains descriptive metadata about a document. It inherits all of the properties and methods described in the HTMLElement interface.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMetaElement)
 */
interface HTMLMetaElement extends AttrElement {
    /** Gets or sets meta-information to associate with httpEquiv or name. */
    content: string;
    /** Gets or sets information used to bind the value of a content attribute of a meta element to an HTTP response header. */
    httpEquiv: string;
    media: string;
    /** Sets or retrieves the value specified in the content attribute of the meta object. */
    name: string;
}


/**
 * The HTML <meter> elements expose the HTMLMeterElement interface, which provides special properties and methods (beyond the HTMLElement object interface they also have available to them by inheritance) for manipulating the layout and presentation of <meter> elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMeterElement)
 */
interface HTMLMeterElement extends AttrElement {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMeterElement/high) */
    high: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMeterElement/low) */
    low: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMeterElement/max) */
    max: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMeterElement/min) */
    min: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMeterElement/optimum) */
    optimum: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMeterElement/value) */
    value: number;
}


/**
 * Provides special properties (beyond the regular methods and properties available through the HTMLElement interface they also have available to them by inheritance) for manipulating modification elements, that is <del> and <ins>.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLModElement)
 */
interface HTMLModElement extends AttrElement {
    /**
     * Sets or retrieves reference information about the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLModElement/cite)
     */
    cite: string;
    /**
     * Sets or retrieves the date and time of a modification to the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLModElement/dateTime)
     */
    dateTime: string;
}


/**
 * Provides special properties (beyond those defined on the regular HTMLElement interface it also has available to it by inheritance) for manipulating ordered list elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOListElement)
 */
interface HTMLOListElement extends AttrElement {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOListElement/reversed) */
    reversed: boolean;
    /**
     * The starting number.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOListElement/start)
     */
    start: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOListElement/type) */
    type: string;
}


/**
 * Provides special properties and methods (beyond those on the HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of <object> element, representing external resources.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement)
 */
interface HTMLObjectElement extends AttrElement {
    /**
     * Retrieves the document object of the page or frame.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement/contentDocument)
     */
    readonly contentDocument: Document | null;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement/contentWindow) */
    readonly contentWindow: WindowProxy | null;
    /**
     * Sets or retrieves the URL that references the data of the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement/data)
     */
    data: string;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement/form)
     */
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves the height of the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement/height)
     */
    height: string;
    /**
     * Sets or retrieves the name of the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement/name)
     */
    name: string;
    /**
     * Sets or retrieves the MIME type of the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement/type)
     */
    type: string;
    /**
     * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement/useMap)
     */
    useMap: string;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement/validationMessage)
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement/validity)
     */
    readonly validity: ValidityState;
    /**
     * Sets or retrieves the width of the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement/width)
     */
    width: string;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement/willValidate)
     */
    readonly willValidate: boolean;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement/checkValidity)
     */
    checkValidity(): boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement/getSVGDocument) */
    getSVGDocument(): Document | null;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement/reportValidity) */
    reportValidity(): boolean;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLObjectElement/setCustomValidity)
     */
    setCustomValidity(error: string): void;
}


/**
 * Provides special properties and methods (beyond the regular HTMLElement object interface they also have available to them by inheritance) for manipulating the layout and presentation of <optgroup> elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptGroupElement)
 */
interface HTMLOptGroupElement extends AttrElement {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptGroupElement/disabled) */
    disabled: boolean;
    /**
     * Sets or retrieves a value that you can use to implement your own label functionality for the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptGroupElement/label)
     */
    label: string;
}


/**
 * <option> elements and inherits all classes and methods of the HTMLElement interface.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptionElement)
 */
interface HTMLOptionElement extends AttrElement {
    /**
     * Sets or retrieves the status of an option.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptionElement/defaultSelected)
     */
    defaultSelected: boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptionElement/disabled) */
    disabled: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptionElement/form)
     */
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves the ordinal position of an option in a list box.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptionElement/index)
     */
    readonly index: number;
    /**
     * Sets or retrieves a value that you can use to implement your own label functionality for the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptionElement/label)
     */
    label: string;
    /**
     * Sets or retrieves whether the option in the list box is the default item.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptionElement/selected)
     */
    selected: boolean;
    /**
     * Sets or retrieves the text string specified by the option tag.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptionElement/text)
     */
    text: string;
    /**
     * Sets or retrieves the value which is returned to the server when the form control is submitted.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptionElement/value)
     */
    value: string;
}


interface HTMLOrSVGElement {
    autofocus: boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dataset) */
    readonly dataset: DOMStringMap;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/nonce) */
    nonce?: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/tabIndex) */
    tabIndex: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/blur) */
    blur(): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/focus) */
    focus(options?: FocusOptions): void;
}

/**
 * Provides properties and methods (beyond those inherited from HTMLElement) for manipulating the layout and presentation of <output> elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement)
 */
interface HTMLOutputElement extends AttrElement {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement/defaultValue) */
    defaultValue: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement/form) */
    readonly form: HTMLFormElement | null;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement/htmlFor) */
    readonly htmlFor: DOMTokenList;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement/name) */
    name: string;
    /**
     * Returns the string "output".
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement/type)
     */
    readonly type: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement/validationMessage) */
    readonly validationMessage: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement/validity) */
    readonly validity: ValidityState;
    /**
     * Returns the element's current value.
     *
     * Can be set, to change the value.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement/value)
     */
    value: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement/willValidate) */
    readonly willValidate: boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement/checkValidity) */
    checkValidity(): boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement/reportValidity) */
    reportValidity(): boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement/setCustomValidity) */
    setCustomValidity(error: string): void;
}


/**
 * Provides special properties (beyond those of the regular HTMLElement object interface it inherits) for manipulating <p> elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLParagraphElement)
 */
interface HTMLParagraphElement extends AttrElement {
}


/**
 * A <picture> HTML element. It doesn't implement specific properties or methods.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLPictureElement)
 */
interface HTMLPictureElement extends AttrElement {
}

/**
 * Exposes specific properties and methods (beyond those of the HTMLElement interface it also has available to it by inheritance) for manipulating a block of preformatted text (<pre>).
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLPreElement)
 */
interface HTMLPreElement extends AttrElement {
}


/**
 * Provides special properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of <progress> elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLProgressElement)
 */
interface HTMLProgressElement extends AttrElement {
    /**
     * Defines the maximum, or "done" value for a progress element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLProgressElement/max)
     */
    max: number;
    /**
     * Returns the quotient of value/max when the value attribute is set (determinate progress bar), or -1 when the value attribute is missing (indeterminate progress bar).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLProgressElement/position)
     */
    readonly position: number;
    /**
     * Sets or gets the current value of a progress element. The value must be a non-negative number between 0 and the max value.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLProgressElement/value)
     */
    value: number;
}


/**
 * Provides special properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating quoting elements, like <blockquote> and <q>, but not the <cite> element.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLQuoteElement)
 */
interface HTMLQuoteElement extends AttrElement {
    /**
     * Sets or retrieves reference information about the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLQuoteElement/cite)
     */
    cite: string;
}


/**
 * HTML <script> elements expose the HTMLScriptElement interface, which provides special properties and methods for manipulating the behavior and execution of <script> elements (beyond the inherited HTMLElement interface).
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLScriptElement)
 */
interface HTMLScriptElement extends AttrElement {
    async: boolean;
    crossOrigin: string | null;
    /** Sets or retrieves the status of the script. */
    defer: boolean;
    integrity: string;
    noModule: boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLScriptElement/referrerPolicy) */
    referrerPolicy: string;
    /** Retrieves the URL to an external file that contains the source code or data. */
    src: string;
    /** Retrieves or sets the text of the object as a string. */
    text: string;
    /** Sets or retrieves the MIME type for the associated scripting engine. */
    type: string;
}


/**
 * A <select> HTML Element. These elements also share all of the properties and methods of other HTML elements via the HTMLElement interface.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement)
 */
interface HTMLSelectElement extends AttrElement {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/autocomplete) */
    autocomplete: AutoFill;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/disabled) */
    disabled: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/form)
     */
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves the number of objects in a collection.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/length)
     */
    length: number;
    /**
     * Sets or retrieves the Boolean value indicating whether multiple items can be selected from a list.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/multiple)
     */
    multiple: boolean;
    /**
     * Sets or retrieves the name of the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/name)
     */
    name: string;
    /**
     * Returns an HTMLOptionsCollection of the list of options.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/options)
     */
    readonly options: HTMLOptionsCollection;
    /**
     * When present, marks an element that can't be submitted without a value.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/required)
     */
    required: boolean;
    /**
     * Sets or retrieves the index of the selected option in a select object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/selectedIndex)
     */
    selectedIndex: number;
    /**
     * Sets or retrieves the number of rows in the list box.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/size)
     */
    size: number;
    /**
     * Retrieves the type of select control based on the value of the MULTIPLE attribute.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/type)
     */
    readonly type: string;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/validationMessage)
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/validity)
     */
    readonly validity: ValidityState;
    /**
     * Sets or retrieves the value which is returned to the server when the form control is submitted.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/value)
     */
    value: string;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/willValidate)
     */
    readonly willValidate: boolean;
    /**
     * Adds an element to the areas, controlRange, or options collection.
     * @param element Variant of type Number that specifies the index position in the collection where the element is placed. If no value is given, the method places the element at the end of the collection.
     * @param before Variant of type Object that specifies an element to insert before, or null to append the object to the collection.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/add)
     */
    add(element: HTMLOptionElement | HTMLOptGroupElement, before?: AttrElement | number | null): void;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/checkValidity)
     */
    checkValidity(): boolean;
    /**
     * Retrieves a select object or an object from an options collection.
     * @param name Variant of type Number or String that specifies the object or collection to retrieve. If this parameter is an integer, it is the zero-based index of the object. If this parameter is a string, all objects with matching name or id properties are retrieved, and a collection is returned if more than one match is made.
     * @param index Variant of type Number that specifies the zero-based index of the object to retrieve when a collection is returned.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/item)
     */
    item(index: number): HTMLOptionElement | null;
    /**
     * Retrieves a select object or an object from an options collection.
     * @param namedItem A String that specifies the name or id property of the object to retrieve. A collection is returned if more than one match is made.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/namedItem)
     */
    namedItem(name: string): HTMLOptionElement | null;
    /**
     * Removes an element from the collection.
     * @param index Number that specifies the zero-based index of the element to remove from the collection.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/remove)
     */
    remove(): void;
    remove(index: number): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/reportValidity) */
    reportValidity(): boolean;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/setCustomValidity)
     */
    setCustomValidity(error: string): void;
    [name: number]: HTMLOptionElement | HTMLOptGroupElement;
}


/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSlotElement) */
interface HTMLSlotElement extends AttrElement {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSlotElement/name) */
    name: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSlotElement/assign) */
    assign(...nodes: (Element | Text)[]): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSlotElement/assignedElements) */
    assignedElements(options?: AssignedNodesOptions): Element[];
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSlotElement/assignedNodes) */
    assignedNodes(options?: AssignedNodesOptions): Node[];
}


/**
 * Provides special properties (beyond the regular HTMLElement object interface it also has available to it by inheritance) for manipulating <source> elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSourceElement)
 */
interface HTMLSourceElement extends AttrElement {
    height: number;
    /**
     * Gets or sets the intended media type of the media source.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSourceElement/media)
     */
    media: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSourceElement/sizes) */
    sizes: string;
    /**
     * The address or URL of the a media resource that is to be considered.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSourceElement/src)
     */
    src: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSourceElement/srcset) */
    srcset: string;
    /**
     * Gets or sets the MIME type of a media resource.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSourceElement/type)
     */
    type: string;
    width: number;
}


/**
 * A <span> element and derives from the HTMLElement interface, but without implementing any additional properties or methods.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSpanElement)
 */
interface HTMLSpanElement extends AttrElement {
}


/**
 * A <style> element. It inherits properties and methods from its parent, HTMLElement, and from LinkStyle.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLStyleElement)
 */
interface HTMLStyleElement extends AttrElement, LinkStyle {
    /**
     * Enables or disables the style sheet.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLStyleElement/disabled)
     */
    disabled: boolean;
    /**
     * Sets or retrieves the media type.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLStyleElement/media)
     */
    media: string;
}

/**
 * Special properties (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating table caption elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableCaptionElement)
 */
interface HTMLTableCaptionElement extends AttrElement {
}


/**
 * Provides special properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of table cells, either header or data cells, in an HTML document.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableCellElement)
 */
interface HTMLTableCellElement extends AttrElement {
    /**
     * Sets or retrieves abbreviated text for the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableCellElement/abbr)
     */
    abbr: string;
    /**
     * Retrieves the position of the object in the cells collection of a row.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableCellElement/cellIndex)
     */
    readonly cellIndex: number;
    /**
     * Sets or retrieves the number columns in the table that the object should span.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableCellElement/colSpan)
     */
    colSpan: number;
    /**
     * Sets or retrieves a list of header cells that provide information for the object.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableCellElement/headers)
     */
    headers: string;
    /**
     * Sets or retrieves how many rows in a table the cell should span.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableCellElement/rowSpan)
     */
    rowSpan: number;
    /**
     * Sets or retrieves the group of cells in a table to which the object's information applies.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableCellElement/scope)
     */
    scope: string;
}


/**
 * Provides special properties (beyond the HTMLElement interface it also has available to it inheritance) for manipulating single or grouped table column elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableColElement)
 */
interface HTMLTableColElement extends AttrElement {
    /**
     * Sets or retrieves the number of columns in the group.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableColElement/span)
     */
    span: number;
}



/**
 * Provides special properties and methods (beyond the regular HTMLElement object interface it also has available to it by inheritance) for manipulating the layout and presentation of tables in an HTML document.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableElement)
 */
interface HTMLTableElement extends AttrElement {
    /**
     * Retrieves the caption object of a table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableElement/caption)
     */
    caption: HTMLTableCaptionElement | null;
    /**
     * Retrieves the tFoot object of the table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableElement/tFoot)
     */
    tFoot: HTMLTableSectionElement | null;
    /**
     * Retrieves the tHead object of the table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableElement/tHead)
     */
    tHead: HTMLTableSectionElement | null;
    /**
     * Creates an empty caption element in the table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableElement/createCaption)
     */
    createCaption(): HTMLTableCaptionElement;
    /**
     * Creates an empty tBody element in the table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableElement/createTBody)
     */
    createTBody(): HTMLTableSectionElement;
    /**
     * Creates an empty tFoot element in the table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableElement/createTFoot)
     */
    createTFoot(): HTMLTableSectionElement;
    /**
     * Returns the tHead element object if successful, or null otherwise.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableElement/createTHead)
     */
    createTHead(): HTMLTableSectionElement;
    /**
     * Deletes the caption element and its contents from the table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableElement/deleteCaption)
     */
    deleteCaption(): void;
    /**
     * Removes the specified row (tr) from the element and from the rows collection.
     * @param index Number that specifies the zero-based position in the rows collection of the row to remove.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableElement/deleteRow)
     */
    deleteRow(index: number): void;
    /**
     * Deletes the tFoot element and its contents from the table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableElement/deleteTFoot)
     */
    deleteTFoot(): void;
    /**
     * Deletes the tHead element and its contents from the table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableElement/deleteTHead)
     */
    deleteTHead(): void;
    /**
     * Creates a new row (tr) in the table, and adds the row to the rows collection.
     * @param index Number that specifies where to insert the row in the rows collection. The default value is -1, which appends the new row to the end of the rows collection.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableElement/insertRow)
     */
    insertRow(index?: number): HTMLTableRowElement;
}



/**
 * Provides special properties and methods (beyond the HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of rows in an HTML table.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableRowElement)
 */
interface HTMLTableRowElement extends AttrElement {
    /**
     * Retrieves the position of the object in the rows collection for the table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableRowElement/rowIndex)
     */
    readonly rowIndex: number;
    /**
     * Retrieves the position of the object in the collection.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableRowElement/sectionRowIndex)
     */
    readonly sectionRowIndex: number;
    /**
     * Removes the specified cell from the table row, as well as from the cells collection.
     * @param index Number that specifies the zero-based position of the cell to remove from the table row. If no value is provided, the last cell in the cells collection is deleted.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableRowElement/deleteCell)
     */
    deleteCell(index: number): void;
    /**
     * Creates a new cell in the table row, and adds the cell to the cells collection.
     * @param index Number that specifies where to insert the cell in the tr. The default value is -1, which appends the new cell to the end of the cells collection.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableRowElement/insertCell)
     */
    insertCell(index?: number): HTMLTableCellElement;
}


/**
 * Provides special properties and methods (beyond the HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of sections, that is headers, footers and bodies, in an HTML table.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableSectionElement)
 */
interface HTMLTableSectionElement extends AttrElement {
    /**
     * Removes the specified row (tr) from the element and from the rows collection.
     * @param index Number that specifies the zero-based position in the rows collection of the row to remove.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableSectionElement/deleteRow)
     */
    deleteRow(index: number): void;
    /**
     * Creates a new row (tr) in the table, and adds the row to the rows collection.
     * @param index Number that specifies where to insert the row in the rows collection. The default value is -1, which appends the new row to the end of the rows collection.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableSectionElement/insertRow)
     */
    insertRow(index?: number): HTMLTableRowElement;
}


/**
 * Enables access to the contents of an HTML <template> element.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTemplateElement)
 */
interface HTMLTemplateElement extends AttrElement {
    /**
     * Returns the template contents (a DocumentFragment).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTemplateElement/content)
     */
    readonly content: DocumentFragment;
}


/**
 * Provides special properties and methods for manipulating the layout and presentation of <textarea> elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement)
 */
interface HTMLTextAreaElement extends AttrElement {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement/autocomplete) */
    autocomplete: AutoFill;
    /** Sets or retrieves the width of the object. */
    cols: number;
    /** Sets or retrieves the initial contents of the object. */
    defaultValue: string;
    dirName: string;
    disabled: boolean;
    /** Retrieves a reference to the form that the object is embedded in. */
    readonly form: HTMLFormElement | null;
    /** Sets or retrieves the maximum number of characters that the user can enter in a text control. */
    maxLength: number;
    minLength: number;
    /** Sets or retrieves the name of the object. */
    name: string;
    /** Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or type of information they need to enter.The text appears in an input field until the user puts focus on the field. */
    placeholder: string;
    /** Sets or retrieves the value indicated whether the content of the object is read-only. */
    readOnly: boolean;
    /** When present, marks an element that can't be submitted without a value. */
    required: boolean;
    /** Sets or retrieves the number of horizontal rows contained in the object. */
    rows: number;
    selectionDirection: "forward" | "backward" | "none";
    /** Gets or sets the end position or offset of a text selection. */
    selectionEnd: number;
    /** Gets or sets the starting position or offset of a text selection. */
    selectionStart: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement/textLength) */
    readonly textLength: number;
    /** Retrieves the type of control. */
    readonly type: string;
    /** Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting. */
    readonly validationMessage: string;
    /** Returns a  ValidityState object that represents the validity states of an element. */
    readonly validity: ValidityState;
    /** Retrieves or sets the text in the entry field of the textArea element. */
    value: string;
    /** Returns whether an element will successfully validate based on forms validation rules and constraints. */
    readonly willValidate: boolean;
    /** Sets or retrieves how to handle wordwrapping in the object. */
    wrap: string;
    /** Returns whether a form will validate when it is submitted, without having to submit it. */
    checkValidity(): boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement/reportValidity) */
    reportValidity(): boolean;
    /** Highlights the input area of a form element. */
    select(): void;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
    setRangeText(replacement: string): void;
    setRangeText(replacement: string, start: number, end: number, selectionMode?: SelectionMode): void;
    /**
     * Sets the start and end positions of a selection in a text field.
     * @param start The offset into the text field for the start of the selection.
     * @param end The offset into the text field for the end of the selection.
     * @param direction The direction in which the selection is performed.
     */
    setSelectionRange(start: number | null, end: number | null, direction?: "forward" | "backward" | "none"): void;
}


/**
 * Provides special properties (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating <time> elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTimeElement)
 */
interface HTMLTimeElement extends AttrElement {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTimeElement/dateTime) */
    dateTime: string;
}


/**
 * Contains the title for a document. This element inherits all of the properties and methods of the HTMLElement interface.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTitleElement)
 */
interface HTMLTitleElement extends AttrElement {
    /**
     * Retrieves or sets the text of the object as a string.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTitleElement/text)
     */
    text: string;
}


/**
 * The HTMLTrackElement
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement)
 */
interface HTMLTrackElement extends AttrElement {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/default) */
    default: boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/kind) */
    kind: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/label) */
    label: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/readyState) */
    readonly readyState: number;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/src) */
    src: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/srclang) */
    srclang: string;
    /**
     * Returns the TextTrack object corresponding to the text track of the track element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/track)
     */
    readonly track: TextTrack;
    readonly NONE: 0;
    readonly LOADING: 1;
    readonly LOADED: 2;
    readonly ERROR: 3;
}


/**
 * Provides special properties (beyond those defined on the regular HTMLElement interface it also has available to it by inheritance) for manipulating unordered list elements.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLUListElement)
 */
interface HTMLUListElement extends AttrElement {
}


export interface ElementTagNameMap {
    "a": HTMLAnchorElement;
    "abbr": AttrElement;
    "address": AttrElement;
    "area": HTMLAreaElement;
    "article": AttrElement;
    "aside": AttrElement;
    "audio": HTMLAudioElement;
    "b": AttrElement;
    "base": HTMLBaseElement;
    "bdi": AttrElement;
    "bdo": AttrElement;
    "blockquote": HTMLQuoteElement;
    "body": HTMLBodyElement;
    "br": HTMLBRElement;
    "button": HTMLButtonElement;
    "canvas": HTMLCanvasElement;
    "caption": HTMLTableCaptionElement;
    "cite": AttrElement;
    "code": AttrElement;
    "col": HTMLTableColElement;
    "colgroup": HTMLTableColElement;
    "data": HTMLDataElement;
    "datalist": HTMLDataListElement;
    "dd": AttrElement;
    "del": HTMLModElement;
    "details": HTMLDetailsElement;
    "dfn": AttrElement;
    "dialog": HTMLDialogElement;
    "div": HTMLDivElement;
    "dl": HTMLDListElement;
    "dt": AttrElement;
    "em": AttrElement;
    "embed": HTMLEmbedElement;
    "fieldset": HTMLFieldSetElement;
    "figcaption": AttrElement;
    "figure": AttrElement;
    "footer": AttrElement;
    "form": HTMLFormElement;
    "h1": HTMLHeadingElement;
    "h2": HTMLHeadingElement;
    "h3": HTMLHeadingElement;
    "h4": HTMLHeadingElement;
    "h5": HTMLHeadingElement;
    "h6": HTMLHeadingElement;
    "head": HTMLHeadElement;
    "header": AttrElement;
    "hgroup": AttrElement;
    "hr": HTMLHRElement;
    "html": HTMLHtmlElement;
    "i": AttrElement;
    "iframe": HTMLIFrameElement;
    "img": HTMLImageElement;
    "input": HTMLInputElement;
    "ins": HTMLModElement;
    "kbd": AttrElement;
    "label": HTMLLabelElement;
    "legend": HTMLLegendElement;
    "li": HTMLLIElement;
    "link": HTMLLinkElement;
    "main": AttrElement;
    "map": HTMLMapElement;
    "mark": AttrElement;
    "menu": HTMLMenuElement;
    "meta": HTMLMetaElement;
    "meter": HTMLMeterElement;
    "nav": AttrElement;
    "noscript": AttrElement;
    "object": HTMLObjectElement;
    "ol": HTMLOListElement;
    "optgroup": HTMLOptGroupElement;
    "option": HTMLOptionElement;
    "output": HTMLOutputElement;
    "p": HTMLParagraphElement;
    "picture": HTMLPictureElement;
    "pre": HTMLPreElement;
    "progress": HTMLProgressElement;
    "q": HTMLQuoteElement;
    "rp": AttrElement;
    "rt": AttrElement;
    "ruby": AttrElement;
    "s": AttrElement;
    "samp": AttrElement;
    "script": HTMLScriptElement;
    "search": AttrElement;
    "section": AttrElement;
    "select": HTMLSelectElement;
    "slot": HTMLSlotElement;
    "small": AttrElement;
    "source": HTMLSourceElement;
    "span": HTMLSpanElement;
    "strong": AttrElement;
    "style": HTMLStyleElement;
    "sub": AttrElement;
    "summary": AttrElement;
    "sup": AttrElement;
    "table": HTMLTableElement;
    "tbody": HTMLTableSectionElement;
    "td": HTMLTableCellElement;
    "template": HTMLTemplateElement;
    "textarea": HTMLTextAreaElement;
    "tfoot": HTMLTableSectionElement;
    "th": HTMLTableCellElement;
    "thead": HTMLTableSectionElement;
    "time": HTMLTimeElement;
    "title": HTMLTitleElement;
    "tr": HTMLTableRowElement;
    "track": HTMLTrackElement;
    "u": AttrElement;
    "ul": HTMLUListElement;
    "var": AttrElement;
    "video": HTMLVideoElement;
    "wbr": AttrElement;
}

