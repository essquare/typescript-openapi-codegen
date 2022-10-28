import { isDefined } from '../../../utils/isDefined';
import type { Dictionary } from '../../../utils/types';
import type { OpenApi } from '../interfaces/OpenApi';
import type { OpenApiMediaType } from '../interfaces/OpenApiMediaType';
import type { OpenApiSchema } from '../interfaces/OpenApiSchema';

export interface Content {
    mediaType: string;
    schema: OpenApiSchema;
}

export const getContent = (openApi: OpenApi, content: Dictionary<OpenApiMediaType>): Content[] | null => {
    const contents: Content[] = [];
    Object.keys(content)
        .filter(mediaType => isDefined(content[mediaType]?.schema))
        .forEach(mediaType => {
            contents.push({
                mediaType: mediaType,
                schema: content[mediaType].schema as OpenApiSchema,
            });
        });

    return contents.length ? contents : null;
};
