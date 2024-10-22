import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../CardComponent';
import { AlertCircle } from 'lucide-react';
import Alert from "../Alert-component"
import CodeBlock from '../Code-block-component';

const InitializeProject = ({ projectName = "", selectedPlatform = "" }) => {
  const getSDKSnippet = () => {
    switch (selectedPlatform.toLowerCase()) {
      case 'php':
        return `composer require myapp/sdk
        
$client = new MyApp\\SDK([
  'project' => '${projectName}',
  'key' => 'YOUR_API_KEY'
]);`;
      case 'python':
        return `pip install myapp-sdk

from myapp import Client

client = Client(
    project='${projectName}',
    api_key='YOUR_API_KEY'
)`;
      case 'react':
        return `npm install @myapp/sdk

import { MyAppClient } from '@myapp/sdk';

const client = new MyAppClient({
  project: '${projectName}',
  apiKey: 'YOUR_API_KEY'
});`;
      default:
        return `// Install the SDK for ${selectedPlatform}
        
const client = new MyApp({
  project: '${projectName}',
  apiKey: 'YOUR_API_KEY'
});`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                3
              </span>
              Initialize the SDK
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Alert variant="info" className="mb-4">
                <AlertCircle className="text-blue-500" size={20} />
                <p className="text-sm">
                  Keep your API key secure and never expose it in client-side code
                </p>
              </Alert>

              <CodeBlock code={getSDKSnippet()} />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Next steps:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Add your API key to your environment variables</li>
                <li>Initialize the SDK in your application</li>
                <li>Start sending events to your project</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InitializeProject;