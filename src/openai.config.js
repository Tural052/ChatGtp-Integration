const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: "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",
});

const openai = new OpenAIApi(config);
export default openai;