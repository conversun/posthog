import { NodeType, serializedNodeWithId, wireframeDiv, wireframeStatusBar } from '../mobile.types'
import { makeDivElement, STATUS_BAR_ID } from './transformers'
import { ConversionContext, ConversionResult } from './types'
import { asStyleString, makeStylesString, TOP_OF_STACK } from './wireframeStyle'

function spacerDiv(idSequence: Generator<number>): serializedNodeWithId {
    const spacerId = idSequence.next().value
    return {
        type: NodeType.Element,
        tagName: 'div',
        attributes: {
            style: 'width: 5px;',
            'data-rrweb-id': spacerId,
        },
        id: spacerId,
        childNodes: [],
    }
}

export function makeNavigationBar(
    wireframe: wireframeDiv,
    _children: serializedNodeWithId[],
    context: ConversionContext
): ConversionResult<serializedNodeWithId> | null {
    return makeDivElement(wireframe, _children, {
        ...context,
        styleOverride: { ...context.styleOverride, 'z-index': TOP_OF_STACK },
    })
}

/**
 * tricky: we need to accept children because that's the interface of converters, but we don't use them
 */
export function makeStatusBar(
    wireframe: wireframeStatusBar,
    _children: serializedNodeWithId[],
    context: ConversionContext
): ConversionResult<serializedNodeWithId> {
    const clockId = context.idSequence.next().value
    // convert the wireframe timestamp to a date time, then get just the hour and minute of the time from that
    const clockTime = context.timestamp
        ? new Date(context.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : ''
    const clock: serializedNodeWithId = {
        type: NodeType.Element,
        tagName: 'div',
        attributes: {
            'data-rrweb-id': clockId,
        },
        id: clockId,
        childNodes: [
            {
                type: NodeType.Text,
                textContent: clockTime,
                id: context.idSequence.next().value,
            },
        ],
    }

    return {
        result: {
            type: NodeType.Element,
            tagName: 'div',
            attributes: {
                style: asStyleString([
                    makeStylesString(wireframe, { 'z-index': TOP_OF_STACK }),
                    'display:flex',
                    'flex-direction:row',
                    'align-items:center',
                ]),
                'data-rrweb-id': STATUS_BAR_ID,
            },
            id: STATUS_BAR_ID,
            childNodes: [spacerDiv(context.idSequence), clock],
        },
        context,
    }
}
