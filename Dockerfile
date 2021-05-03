FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80 443

ENV ASPNETCORE_URLS=https://+:443;http://+:80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["MovieMagic.csproj", "./"]
RUN dotnet restore "MovieMagic.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "MovieMagic.csproj" -c Release -o /app/build
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y nodejs \
    && curl -L https://www.npmjs.com/install.sh | sh

FROM build AS publish
RUN dotnet publish "MovieMagic.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MovieMagic.dll"]
