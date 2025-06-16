```bash
dotnet tool install --global dotnet-ef --version "8.0.*" 
```
Se por algum motivo o comando acima não funcionar, saiba que no dia 15/06 a versão mais recente do `dotnet-ef` é a 8.0.16.
# EF Cli Localmente
E se por algum motivo o comando `dotnet ef` não estiver funcionando mesmo depois de fechar e abrir o terminal, tente usar as ferramntas localmente, da documentação:

>Local tools are stored in the NuGet global directory, whatever you've set that to be. There are shim files in `$HOME/.dotnet/toolResolverCache` for each local tool that point to where the tools are within that location.

>References to local tools are added to a _dotnet-tools.json_ file in a _.config_ directory under the current directory. If a manifest file doesn't exist yet, create it by using the `--create-manifest-if-needed` option or by running the following command:
```bash
dotnet new tool-manifest
```

Use --tool-path para alterar o caminho se precisar:
> `--tool-path` tools
>
>Tools with explicit tool paths are stored wherever you specified the `--tool-path` parameter to point to. They're stored in the same way as global tools: an executable binary with the actual binaries in a sibling `.store` directory. 
