import type { OperationResponse } from '../../../client/interfaces/OperationResponse';
import { getPattern } from '../../../utils/getPattern';
import type { OpenApi } from '../interfaces/OpenApi';
import type { OpenApiResponse } from '../interfaces/OpenApiResponse';
import type { OpenApiSchema } from '../interfaces/OpenApiSchema';
import { getContent } from './getContent';
import { getModel } from './getModel';
import { getRef } from './getRef';
import { getType } from './getType';

export const getOperationResponse = (
    openApi: OpenApi,
    response: OpenApiResponse,
    responseCode: number
): OperationResponse[] => {
    const responses: OperationResponse[] = [];

    if (response.content) {
        const contents = getContent(openApi, response.content);
        if (contents && contents.length > 0) {
            contents.forEach(content => {
                const operationResponse = getBaseResponse(response, responseCode);
                if (content.schema.$ref?.startsWith('#/components/responses/')) {
                    content.schema = getRef<OpenApiSchema>(openApi, content.schema);
                }
                if (content.schema.$ref) {
                    const model = getType(content.schema.$ref);
                    operationResponse.export = 'reference';
                    operationResponse.type = model.type;
                    operationResponse.base = model.base;
                    operationResponse.template = model.template;
                    operationResponse.imports.push(...model.imports);
                    responses.push(operationResponse);
                    return;
                }
                const model = getModel(openApi, content.schema);
                operationResponse.export = model.export;
                operationResponse.type = model.type;
                operationResponse.base = model.base;
                operationResponse.template = model.template;
                operationResponse.link = model.link;
                operationResponse.isReadOnly = model.isReadOnly;
                operationResponse.isRequired = model.isRequired;
                operationResponse.isNullable = model.isNullable;
                operationResponse.format = model.format;
                operationResponse.maximum = model.maximum;
                operationResponse.exclusiveMaximum = model.exclusiveMaximum;
                operationResponse.minimum = model.minimum;
                operationResponse.exclusiveMinimum = model.exclusiveMinimum;
                operationResponse.multipleOf = model.multipleOf;
                operationResponse.maxLength = model.maxLength;
                operationResponse.minLength = model.minLength;
                operationResponse.maxItems = model.maxItems;
                operationResponse.minItems = model.minItems;
                operationResponse.uniqueItems = model.uniqueItems;
                operationResponse.maxProperties = model.maxProperties;
                operationResponse.minProperties = model.minProperties;
                operationResponse.pattern = getPattern(model.pattern);
                operationResponse.imports.push(...model.imports);
                operationResponse.enum.push(...model.enum);
                operationResponse.enums.push(...model.enums);
                operationResponse.properties.push(...model.properties);
                responses.push(operationResponse);
            });
        }
        if (responses.length) {
            return responses;
        }
    }

    // We support basic properties from response headers, since both
    // fetch and XHR client just support string types.
    if (response.headers) {
        for (const name in response.headers) {
            if (response.headers.hasOwnProperty(name)) {
                const operationResponse = getBaseResponse(response, responseCode);
                operationResponse.in = 'header';
                operationResponse.name = name;
                operationResponse.type = 'string';
                operationResponse.base = 'string';
                responses.push(operationResponse);
            }
        }
        if (responses.length) {
            return responses; // TODO: is it possible to return headers and results
        }
    }

    return [getBaseResponse(response, responseCode)];
};

const getBaseResponse = (response: OpenApiResponse, responseCode: number): OperationResponse => {
    return {
        in: 'response',
        name: '',
        code: responseCode,
        description: response.description || null,
        export: 'generic',
        type: 'any',
        base: 'any',
        template: null,
        link: null,
        isDefinition: false,
        isReadOnly: false,
        isRequired: false,
        isNullable: false,
        imports: [],
        enum: [],
        enums: [],
        properties: [],
    };
};
