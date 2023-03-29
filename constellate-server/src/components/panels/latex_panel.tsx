/** Renderer for LaTeX panels. */

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    EuiMarkdownFormat,
    getDefaultEuiMarkdownParsingPlugins,
    getDefaultEuiMarkdownProcessingPlugins,
    EuiPanel,
    EuiFlexGroup,
    EuiFlexItem,
} from '@elastic/eui';
import { useRouter } from 'next/router';
import { KatexRenderer, MathMarkdownParser } from '../markdown/math';

const parsingList = getDefaultEuiMarkdownParsingPlugins();
parsingList.push([MathMarkdownParser, { singleDollar: true }]);

const processingList = getDefaultEuiMarkdownProcessingPlugins();
processingList[1][1].components.mathPlugin = KatexRenderer;

export default function LatexPanel({ children }) {
    const router = useRouter();
    return (
        <EuiFlexGroup
            direction="column"
            justifyContent="center"
            className="eui-fullHeight gradientBg"
            key={router.asPath}>
            <EuiFlexItem grow={false} className="eui-fullHeight">
                <EuiPanel grow={false} className="margin2 eui-fullHeight eui-yScroll">
                    <EuiMarkdownFormat
                        parsingPluginList={parsingList}
                        processingPluginList={processingList as any}
                        id="latexContent"
                        grow={true}>
                        {children}
                    </EuiMarkdownFormat>
                </EuiPanel>
            </EuiFlexItem>
        </EuiFlexGroup>
    );
}
