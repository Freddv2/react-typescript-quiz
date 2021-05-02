import {CfnOutput, Construct, RemovalPolicy, Stack, StackProps} from "@aws-cdk/core";
import {BucketDeployment, Source} from "@aws-cdk/aws-s3-deployment";
import {ARecord, PublicHostedZone, RecordTarget} from "@aws-cdk/aws-route53";
import {DnsValidatedCertificate} from "@aws-cdk/aws-certificatemanager";
import {CloudFrontTarget} from "@aws-cdk/aws-route53-targets";
import {CloudFrontWebDistribution, SecurityPolicyProtocol, SSLMethod} from "@aws-cdk/aws-cloudfront";
import {Bucket} from "@aws-cdk/aws-s3";

export class JeuxDesDevinettesStack extends Stack {

  readonly subDomainName = 'www'
  readonly domainName = 'jeux-des-devinettes.com'
  readonly siteDomain = this.subDomainName + '.' + this.domainName

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //After the zone have been created, the NS named Server values in the DNS configuration must be set manually in the registered Domain name Named Server Fields
    const zone = new PublicHostedZone(this, 'Hosted Zone', {
      zoneName: this.domainName,
    })
    new CfnOutput(this, 'Site', {value: 'https://' + this.siteDomain});

    // Content bucket
    const bucket = new Bucket(this, 'SiteBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY
    });
    new CfnOutput(this, 'Bucket', {value: bucket.bucketName});

    // TLS certificate
    // TLS certificate

    const certificateArn = new DnsValidatedCertificate(this, 'SiteCertificate', {
      domainName: this.siteDomain,
      hostedZone: zone,
      region: 'us-east-1', // Cloudfront only checks this region for certificates.
    }).certificateArn;
    new CfnOutput(this, 'Certificate', {value: certificateArn});


    // CloudFront distribution that provides HTTPS
    const distribution = new CloudFrontWebDistribution(this, 'SiteDistribution', {
      aliasConfiguration: {
        acmCertRef: certificateArn,
        names: [this.siteDomain],
        sslMethod: SSLMethod.SNI,
        securityPolicy: SecurityPolicyProtocol.TLS_V1_1_2016,
      },
      originConfigs: [
        {
          s3OriginSource: {
            //Point to our bucket
            s3BucketSource: bucket
          },
          behaviors: [{isDefaultBehavior: true}]
        }
      ],
      // On refresh, app return an 403. This config allow us to refresh by redirecting to index.html with a 200
      errorConfigurations: [
        {
          errorCode: 403,
          responseCode: 200,
          responsePagePath: '/index.html'
        }
      ]
    });
    new CfnOutput(this, 'DistributionId', {value: distribution.distributionId});

    new ARecord(this, 'Site_ARecord', {
      recordName: this.siteDomain,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone
    });

    // Deploy site contents to S3 bucket
    new BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [Source.asset('./../ui/build')],
      destinationBucket: bucket,
      distribution: distribution,
    });
  }
}
