// gcloud compute instances create awesome-dagflow-1 \
// --zone=europe-west3-c \
// --machine-type=f1-micro \
// --tags=http-server,https-server \
// --image=debian-9-stretch-v20190514 \
// --image-project=debian-cloud

import BaseOperator from '../models/operator';
import { execFile } from 'mz/child_process';

export class CreateInstance extends BaseOperator {
  
  async execute() {
    const args = ["compute", "instances", "create", this.params.name]
    
    if(this.params.zone) {
      args.push(`--zone=${this.params.zone}`)
    }
    
    if(this.params.machine_type) {
      args.push(`--machine-type=${this.params.machine_type}`)
    }

    if(this.params.tags) {
      args.push(`--tags=${this.params.tags}`)
    }
    
    if(this.params.image) {
      args.push(`--image=${this.params.image}`)
    }
    if(this.params.image_project) {
      args.push(`--image-project=${this.params.image_project}`)
    }
    
    const [stdout, etderr] = await execFile("gcloud", args)
    console.log({stdout, etderr})
  } 
}


export class DeleteInstance extends BaseOperator {
  
  async execute() {
    const args = ["compute", "instances", "delete", this.params.name]

    args.push(`--zone=${this.params.zone}`)
    
    args.push('--quiet')

    const [stdout, etderr] = await execFile("gcloud", args)
    console.log({stdout, etderr})
  } 
}

export class StopInstance extends BaseOperator {
  
  async execute() {
    const args = ["compute", "instances", "stop", this.params.name]

    args.push(`--zone=${this.params.zone}`)
    
    args.push('--quiet')

    const [stdout, etderr] = await execFile("gcloud", args)
    console.log({stdout, etderr})
  } 
}

export class StartInstance extends BaseOperator {
  
  async execute() {
    const args = ["compute", "instances", "start", this.params.name]

    args.push(`--zone=${this.params.zone}`)
    
    args.push('--quiet')

    const [stdout, etderr] = await execFile("gcloud", args)
    console.log({stdout, etderr})
  } 
}


export default {}
